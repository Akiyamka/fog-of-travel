import { geoToH3 } from 'h3-js';
import { Point } from './point';

export class Cell {
  readonly hex: string;

  constructor(point: Point, resolution: number);
  constructor(hex: string);
  constructor(place: string | Point, resolution?: number) {
    if (typeof place === 'string') {
      this.hex = place;
    } else {
      // it is point
      if (!resolution) throw Error('You must specify map resolution')
      this.hex = geoToH3(place.lat, place.lng, resolution);
    }
  }

  toString() {
    return this.hex;
  }
}
