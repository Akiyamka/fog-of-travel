import type { JSX } from 'solid-js';

export function withEventValue(handler: (value: string) => void): JSX.EventHandler<HTMLInputElement, InputEvent> {
  return (e) => handler(e.currentTarget.value);
}