import './global.css';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-loader';
import { render } from 'solid-js/web';
import { H3HexagonLayer } from '@deck.gl/geo-layers';
import { MainPage } from './main-page';
import { MapGL } from './web-components/map';
import config from '../app-config';

export const map = new MapGL({
  accessToken: config.MAP_TOKEN,
  style: config.MAP_STYLE,
  center: config.MAP_CENTER,
  zoom: config.MAP_ZOOM || 14,
  tagName: 'map-gl',
});

map.addDeckGlLayer(H3HexagonLayer, {
  id: 'h3-hexagon-layer',
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
  data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf.h3cells.json',
  pickable: true,
  wireframe: false,
  filled: true,
  extruded: true,
  elevationScale: 20,
  getHexagon: (d) => d.hex,
  getFillColor: (d) => [255, (1 - d.count / 500) * 255, 0],
  getElevation: (d) => d.count,
});


render(() => <MainPage />, document.getElementById('root')!);
