import { Map } from './map';
import s from './main-page.module.css';

export function MainPage() {
  return <div class={s.mainPage}>
    <Map />
  </div>
}