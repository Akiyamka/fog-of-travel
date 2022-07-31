import { DiscoveredArea } from './discovered-area';

export class User {
  readonly id: string;
  readonly isAuthorized = false;
  readonly name = 'anon'
  discoveredArea: DiscoveredArea;

  constructor(id?: string) {
    this.id = id ?? 'Anonymous';
    this.discoveredArea = new DiscoveredArea();
  }

  loadDiscoveredArea() {
    return this.discoveredArea.loadForUser(this.id)
  }

  enableTracking() {
    this.discoveredArea.track();
  }
}