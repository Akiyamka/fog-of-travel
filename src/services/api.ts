import { Cell } from '~entities/cell';
import { User } from '~entities/user';

class Api {
  constructor() {

  }

  async login(email: string): Promise<User> {
    throw Error('Not implemented');
  }

  async getUserDiscoveredCells(): Promise<Cell[]> {
    throw Error('Not implemented');
  }

  async addUserDiscoveredCell(cell: Cell) {
    throw Error('Not implemented');
  }
}

export const api = new Api();
