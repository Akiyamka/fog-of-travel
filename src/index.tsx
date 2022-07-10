import './global.css';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-loader';
import { render } from 'solid-js/web';
import { MainPage } from './main-page';
import { MapGL } from './web-components/map';
import config from '../app-config';

export const map = new MapGL({
  accessToken: config.MAP_TOKEN,
  style: config.MAP_STYLE,
  center: config.MAP_CENTER,
  zoom: config.MAP_ZOOM || 14,
  tagName: 'map-gl'
});

render(() => <MainPage />, document.getElementById('root')!);
