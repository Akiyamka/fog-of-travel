import './global.css';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-loader';
import { render } from 'solid-js/web';
import { MainPage } from './main-page';

render(() => <MainPage />, document.getElementById('root')!);
