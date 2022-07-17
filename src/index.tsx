import './global.css';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-loader';
import { render } from 'solid-js/web';
import { MainPage } from './main-page';
import { DiscoveredArea } from '~entities/discovered-area';

new DiscoveredArea();

render(() => <MainPage />, document.getElementById('root')!);
