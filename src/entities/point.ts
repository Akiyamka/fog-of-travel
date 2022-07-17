export class Point {
  readonly lat: number;
  readonly lng: number;

  constructor({ lat, lng }: { lat: number; lng: number }) {
    this.lat = lat;
    this.lng = lng;
  }

  static isPoint(place: unknown): place is Point {
    return place !== null && typeof place === 'object' && 'lat' in place && 'lng' in place;
  }
}
