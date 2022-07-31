// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GConstructor<T = Record<string, never>> = new (...args: any[]) => T;
export type Feature = GeoJSON.Feature<GeoJSON.GeometryObject>;
export type Position = {
  lng: number;
  lat: number;
} 
export type MapEvent = { lngLat: Position, point: [number, number] };
export type Listener = (event: Event) => void;
export type Event = { lngLat: Position, point: [number, number] };
export interface FitBoundsOptions {
  maxZoom?: number,
  speed?: number,
  padding?: {
    top: number,
    bottom: number,
    left: number,
    right: number
  }
}

export type bbox = [number, number, number, number];
export interface BaseMapInterface {
  on(type: string, listener: Listener): void;
  off(type: string, listener: Listener): void;
  once(type: string, listener: Listener): void;
  updateLayerSource(id: string, newSource: Layer['source']): Promise<void>;
  deleteLayer(id: string): Promise<void>;
  fitBounds(bbox: bbox, options: FitBoundsOptions): Promise<void>;
  queryFeatures(event: MapEvent, layerId?: string[]): Promise<Feature[]>
  setExpandableCluster(layerId: string, sourceId: string): Promise<() => void>;
  setFeatureState(options: { source: string; id: string }, state: Record<string, unknown>): Promise<void>;
  removeFeatureState(options: { source: string; id: string }): Promise<void>;
}

type Expression = (string | number | boolean | Expression)[]

export interface Layer {
  source: {
    type: 'geojson',
    data: GeoJSON.FeatureCollection,
    cluster?: boolean;
    clusterMaxZoom?: number,
    clusterRadius?: number
  } | string,
  style: {
    [key: string]: string | number | Expression
  },
  filter?: Expression
}
