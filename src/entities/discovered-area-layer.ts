import { locator } from 'services/locator';
import { api } from 'services/api';
import { H3Area } from './area';
import { H3Layer } from './h3-layer';
import type { Point } from './point';

export class DiscoveredAreaLayer {
  #layer;
  #currentArea: H3Area = new H3Area(7);

  constructor() {
    this.#layer = new H3Layer({ id: 'fog-of-war', inverted: true, fillColor: [0,0,0,0.3] });
    this.loadCurrentArea();
    this.#watchAndDiscoverPlaces();
  }

  async loadCurrentArea() {
    this.#currentArea.cells = await api.getUserDiscoveredCells(); // TODO add catch
    this.#layer.drawArea(this.#currentArea);
  }

  #watchAndDiscoverPlaces() {
    locator.addPositionChangesListener((point: Point) => {
      const cell = this.#currentArea.createCellPromPoint(point)
      this.#currentArea.addCell(cell);
      this.#layer.drawArea(this.#currentArea);
      api.addUserDiscoveredCell(cell); // TODO add catch
    });
  }
}
