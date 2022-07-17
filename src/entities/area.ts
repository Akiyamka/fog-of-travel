import { Cell } from './cell';
import { Point } from './point';

export class H3Area {
  #cells: Map<Cell['hex'], Cell> = new Map();
  readonly resolution: number;

  constructor(resolution: number) {
    this.resolution = resolution;
  }

  addCell(cell: Cell) {
    this.#cells.set(cell.hex, cell);
  }

  get cells() {
    return Array.from(this.#cells.values());
  }

  set cells(cells: Cell[]) {
    this.#cells = new Map(cells.map((c) => [c.hex, c]));
  }

  createCellPromPoint(point: Point) {
    return new Cell(point, this.resolution);
  }
}
