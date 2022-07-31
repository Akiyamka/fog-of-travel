import { Point } from 'entities/point';

class EventsBroadcaster {
  #listeners = new Set<(arg: any) => void>();

  addListener<T extends (arg: any) => void>(cb: T) {
    this.#listeners.add(cb);
  }

  callListeners<T extends any>(arg: T) {
    this.#listeners.forEach((listener) => listener(arg));
  }
}

class Locator extends EventsBroadcaster {
  currentPosition: Point | null = null;
  id: number | null = null;
  lastUpdate: number | null = null;

  constructor() {
    super();
  }

  runWatcher() {
    if (this.id) navigator.geolocation.clearWatch(this.id);
    this.id = navigator.geolocation.watchPosition(
      ({ coords, timestamp }) => {
        this.lastUpdate = timestamp;
        this.currentPosition = new Point({ lat: coords.latitude, lng: coords.longitude });
        this.callListeners(this.currentPosition);
      },
      (error) => {
        console.warn(`ERROR(${error.code}): ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  addPositionChangesListener(cb: (position: Point) => void) {
    this.currentPosition && cb(this.currentPosition);
    this.addListener(cb);
  }
}

export const locator = new Locator();
