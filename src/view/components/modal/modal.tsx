import { ParentProps } from 'solid-js';
import s from './modal.module.css';

export function Modal({ children, onClose }: ParentProps<{ onClose?: () => void }>) {
  return (
    <div class={s.splashScreen}>
      <div class={s.modalWindow}>{children}</div>
    </div>
  );
}
