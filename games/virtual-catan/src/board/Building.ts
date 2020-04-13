import { Player } from './Player';

export class Building {
  constructor(public player: Player) {
  }
  isSettlement() {
    return false;
  }
  isCity() {
    return false;
  }
}

export class Settlement extends Building {
  isSettlement() {
    return true;
  }
}

export class City extends Building {
  isCity() {
    return true;
  }
}

export class Road extends Building {
}