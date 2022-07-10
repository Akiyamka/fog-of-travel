import type { BaseMapInterface, Listener, Layer, FitBoundsOptions, bbox, MapEvent } from './types';
import maplibre, { GeoJSONSource } from 'maplibre-gl';
import { Marker } from './marker';
import { wrapInWebComponent } from '../_utils';

interface Options {
  container?: HTMLDivElement,
  accessToken: string,
  style: string,
  center: [number, number],
  zoom: number,
  tagName: string,
}

export class MapGL implements BaseMapInterface {
  _mapPromise: Promise<maplibregl.Map>;
  _mapEngine: typeof maplibre;
  _container = document.createElement('div');

  constructor(options: Options) {
    this._mapEngine = maplibre;
    this._mapPromise = this._bootMap(options);
  }

  /* Initialization */

  // Just put custom element in any place of virtual or actual DOM
  async _createMountPoint(tagName: string) {
    const MapWebComponent = await wrapInWebComponent(this._container);
    await (() => new Promise(res => requestAnimationFrame(res)))(); // * Sometimes map engine ignore container size right after it created
    customElements.define(tagName, MapWebComponent);
  }

  async _bootMap(options: Options) {
    await this._createMountPoint(options.tagName);
    return new Promise<maplibregl.Map>((resolve, reject) => {
      try {
        const map = new this._mapEngine.Map({
          container: this._container,
          ...options
        });
        map.once('load', () => {
          resolve(map);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  async _getMap() {
    return this._mapPromise;
  }

  /* Events */

  on(eventType: string, cb: Listener) {
    this._getMap().then(map => {
      map.on(eventType, cb);
    })
  }

  once(eventType: string, cb: Listener) {
    this._getMap().then(map => {
      map.once(eventType, cb);
    })
  }

  off(eventType: string, cb: Listener) {
    this._getMap().then(map => {
      map.off(eventType, cb);
    })
  }

  async queryFeatures(event: MapEvent, layerId?: string[]) {
    const { point } = event;
    const map = await this._getMap();
    const features = map.queryRenderedFeatures(
      point, layerId ? { layers: layerId } : undefined
    );
    return features;
  }

  /* Viewport */

  async fitBounds(bbox: bbox, options: FitBoundsOptions) {
    const map = await this._getMap();
    map.fitBounds(bbox, options);
  }

  /* Styles and Data */

  async updateLayerSource(id: string, newSource: Layer['source']) {
    const map = await this._getMap();
    // if (typeof layer.source !== 'string') {

    // }
    // // Source
    // if (typeof layer.source !== 'string') {
    //   if (!!map.getSource(id)) {
    //     const existingSource = map.getSource(id);
    //     if (existingSource !== undefined && 'setData' in existingSource) {
    //       (existingSource as GeoJSONSource).setData(layer.source.data);
    //     }
    //   } else {
    //     map.addSource(id, layer.source);
    //   }
    // } else {

    // }


  }

  async deleteLayer(id: string) {
    const map = await this._getMap();
    if (map.getLayer(id)) {
      map.removeLayer(id);
    }
    if (map.getSource(id)) {
      map.removeSource(id);
    }
  }

  /* Markers */

  async createMarker(element: HTMLElement) {
    const map = await this._getMap();
    const mapBoxMarkerInstance = new this._mapEngine.Marker({ element })
      .setLngLat([0, 0])
      .addTo(map);
    return new Marker(mapBoxMarkerInstance);
  }

  async setExpandableCluster(layerId: string, sourceId: string) {
    const map = await this._getMap();
    const clickHandler = (e: maplibregl.MapMouseEvent) => {
      const features = map.queryRenderedFeatures(e.point, { layers: [layerId] });
      const props = features[0].properties;
      if (props === null) return;
      const clusterId = props.cluster_id;
      // @ts-expect-error Here we always use GeoJSON
      map.getSource(sourceId).getClusterExpansionZoom(
        clusterId,
        (err: unknown, zoom: number) => {
          if (err) return;

          map.easeTo({
            // @ts-expect-error we not use geometry collection
            center: features[0].geometry.coordinates,
            zoom: zoom
          });
        }
      );
    }

    const hoverHandler = () => map.getCanvas().style.cursor = 'pointer';
    const leaveHandler = () => map.getCanvas().style.cursor = 'pointer';

    map.on('click', layerId, clickHandler);
    map.on('mouseenter', layerId, hoverHandler);
    map.on('mouseleave', layerId, leaveHandler);

    return () => {
      map.off('click', layerId, clickHandler);
      map.off('mouseenter', layerId, hoverHandler);
      map.off('mouseleave', layerId, leaveHandler);
    }
  }

  async setFeatureState({ source, id }: { source: string, id: string }, state: Record<string, unknown>) {
    const map = await this._getMap();
    map.setFeatureState({ source, id }, state);
  }

  async removeFeatureState({ source, id }: { source: string, id: string }) {
    const map = await this._getMap();
    map.removeFeatureState({ source, id });
  }
}

