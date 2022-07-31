import { createSignal, Show } from 'solid-js';
import { createMeaningfulError } from 'utils/createMeaningfulError';
import { useUserContext } from 'view/context-providers/user-context';
import { api } from 'services/api';
import { Modal } from '../modal/modal';
import s from './login-form.module.css';
import { withEventValue } from 'utils/withEventValue';

export function LoginForm() {
  const [user, setUser] = useUserContext();
  const [password, setPassword] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [error, setError] = createSignal('');

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      const user = await api.login({
        password: password(),
        email: email(),
      });
      setUser(user);
    } catch (err) {
      const message = createMeaningfulError(err);
      setError(message);
    }
  };

  return (
    <Show when={!user.isAuthorized}>
      <Modal>
        <div class={s.modalTitle}>Login</div>
        <form onSubmit={onSubmit}>
          <div class={s.flexColumn}>
            <input
              type="email"
              placeholder="Email"
              value={email()}
              onInput={withEventValue(setEmail)}
            ></input>
            <input
              type="password"
              placeholder="Password"
              value={password()}
              onInput={withEventValue(setPassword)}
            ></input>
            <button type="submit">Log in</button>
            <div class={s.errorMessage}>{error()}</div>
          </div>
        </form>
      </Modal>
    </Show>
  );
}
