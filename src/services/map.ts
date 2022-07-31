import config from '../../app-config';
import { MapGL } from '../view/web-components/map';

export const map = new MapGL({
  accessToken: config.MAP_TOKEN,
  style: config.MAP_STYLE,
  center: config.MAP_CENTER,
  zoom: config.MAP_ZOOM || 14,
  tagName: 'map-gl',
});