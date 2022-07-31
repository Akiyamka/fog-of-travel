import { createContext, ParentProps, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { User } from 'entities/user';

export const makeUserContext = (initialCount = 0, initialName = '') => {
  const [user, setUser] = createStore<User>(new User());
  return [user, setUser] as const;
};

type UserContextType = ReturnType<typeof makeUserContext>;
export const UserContext = createContext<UserContextType>();
export const useUserContext = () => useContext(UserContext)!;

export function UserContextProvider(props: ParentProps) {
  return <UserContext.Provider value={makeUserContext()}>
    {props.children}
  </UserContext.Provider>;
}
