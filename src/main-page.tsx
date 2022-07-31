import { Map } from './map';
import { LoginForm } from 'view/components/login-form/login-form';
import s from './main-page.module.css';
import { UserContextProvider } from 'view/context-providers/user-context';

export function MainPage() {
  return <div class={s.mainPage}>
    <UserContextProvider>
      <LoginForm />
      <Map />
    </UserContextProvider>
  </div>
}