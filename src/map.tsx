import { createEffect } from 'solid-js';
import { useUserContext } from 'view/context-providers/user-context';

export function Map() {
  const [user, setUser] = useUserContext();
  createEffect(() => {
    async () => {
      await user.loadDiscoveredArea();
      user.enableTracking();
    }
  });

  return <map-gl></map-gl>;
}
