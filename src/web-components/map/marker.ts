import { Position } from './types';

interface MarkerInstance {
  setLngLat: (position: Position) => void
}

export class Marker {
  marker: MarkerInstance;

  constructor(markerInstance: MarkerInstance) {
    this.marker = markerInstance;
  }

  move(position: Position) {
    this.marker.setLngLat(position)
  }
}
