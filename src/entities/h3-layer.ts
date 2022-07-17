import MapboxLayer from '@deck.gl/mapbox/mapbox-layer';
import { H3HexagonLayer } from '@deck.gl/geo-layers';
import { map } from '~services/map';
import { H3Area } from '~entities/area';

interface H3LayerSettings {
  readonly id: string;
  inverted: boolean;
  fillColor: [number, number, number, number?];
}

export class H3Layer {
  #layer: MapboxLayer<unknown> | null = null;

  constructor(settings: H3LayerSettings) {
    this.#createLayer(settings)
  }

  async #createLayer({ id, fillColor }: H3LayerSettings) {
    this.#layer = await map.addDeckGlLayer(H3HexagonLayer, {
      id,
      /**
       * Data format:
       * [
       *   {
       *     hex: '88283082b9fffff',
       *     count: 96
       *   },
       *   ...
       * ]
       */
      // data: [],
      // @ts-expect-error MapGl custom layers have too strict type
      data: [],
      pickable: false,
      wireframe: false,
      filled: true,
      extruded: false,
      elevationScale: 0,
      getHexagon: (d: { hex: string }) => d.hex,
      getFillColor: () => fillColor,
    });
  }

  drawArea(area: H3Area) {
    if (this.#layer === null) {
      throw Error('Layer nor ready yet')
    }
    this.#layer.setProps({ data: Array.from(area.cells).map((c) => ({ hex: c })) });
  }
}