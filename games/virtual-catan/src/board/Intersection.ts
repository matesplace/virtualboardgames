
import { IntersectionCoordinate } from './Coordinates';
import { Building, Settlement, City } from './Building';

import { Port } from './Port';
import { Path } from './Path';
import { Player } from './Player';

export class Intersection {
  public building?: Building;
  public paths: Path[];
  public port?: Port;
  constructor(public position: IntersectionCoordinate) {
    this.paths = [];
  }
  toString() {
    return this.position.toString();
  }
  setPort(port: Port) {
    this.port = port;
  }
  addPath(path: Path) {
    this.paths.push(path);
  }
  placeSettlement(player: Player) {
    if (!this.building) {
      this.building = new Settlement(player);
    }
  }
  placeCity(player: Player) {
    if (!this.building) {
      this.building = new City(player);
    }
  }
  canClickIntersection(player: Player) {
    if (!this.building) {
      return this.canBuildSettlement(player);
    } else if (this.building && this.building.isSettlement()) {
      return this.canBuildCity(player);
    } else {
      return this.building.player == player;
    }
  }
  canBuildCity(player: Player) {
    return this.building && this.building.isSettlement() &&
      this.building.player == player && player.canBuildCity();
  }
  canBuildSettlement(player: Player) {
    return player.canBuildSettlement() &&
      !this.hasAdjacentSettlement();
  }
  hasAdjacentSettlement() {
    for (let path of this.paths) {
      if (path.getOtherEnd(this).building) {
        return true;
      }
    }
    return false;
  }
}