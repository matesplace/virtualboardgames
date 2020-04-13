import { PathCoordinate, IntersectionCoordinate } from "./Coordinates";
import { Intersection } from "./Intersection";
import { Path } from "./Path";

export class Player {
  
  public numRoads: number = 15;
  public numSettlements: number = 5;
  public numCities: number = 4;

  constructor(public colour: string, public index: number) {
  }

  reset() {
    this.numRoads = 15;
    this.numSettlements = 5;
    this.numCities = 4;
  }

  buildRoad() {
    this.numRoads--;
  }

  buildSettlement() {
    this.numSettlements--;
  }

  buildCity() {
    this.numCities--;
  }

  canBuildRoad() {
    return this.numRoads > 0;
  }
  
  canBuildSettlement() {
    return this.numSettlements > 0;
  }

  canBuildCity() {
    return this.numCities > 0;
  }
}
