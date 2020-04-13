
import { Intersection } from './Intersection';
import { Road } from './Building';

import { Player } from './Player';

export class Path {
  public road?: Road;
  constructor(public start: Intersection, public end: Intersection) {
    start.addPath(this);
    end.addPath(this);
  }
  toString() {
    return `${this.start.toString()}${this.end.toString()}`;
  }
  getOtherEnd(intersection: Intersection) {
    return intersection === this.start ? this.end : this.start;
  }
  placeRoad(player: Player) {
    if (!this.road) {
      this.road = new Road(player);
    }
  }
  canClickPath(player: Player) {
    if (!this.road) {
      return this.canPlaceRoad(player);
    } else {
      return this.road.player == player;
    }
  }
  canPlaceRoad(player: Player) {
    if (!player.canBuildRoad()) {
      return false;
    }
    if (this.start.building &&
      this.start.building.player == player) {
      return true;
    } else {
      for (const path of this.start.paths) {
        if (path.road && path.road.player == player) {
          return true;
        }
      }
    }
    if (this.end.building &&
      this.end.building.player == player) {
      return true;
    } else {
      for (const path of this.end.paths) {
        if (path.road && path.road.player == player) {
          return true;
        }
      }
    }
    return false;
  }
  getLongestPath(player: Player) {
    const visited = new Set<Path>();
    const queue: Path[] = [];
    const counts = new Map<Path, number>();
    queue.push(this);
    counts.set(this, 0);

    while (queue.length) {
      const toVisit = queue.shift()!;
      visited.add(toVisit);
      const curr = counts.get(toVisit)! + 1;

      if (!toVisit.start.building || toVisit.start.building.player == player) {
        toVisit.start.paths.forEach(p => {
          if (p.road && p.road.player == player) {
            if (!visited.has(p)) {
              visited.add(p);
              counts.set(p, curr);
              queue.push(p);
            } else {
              if (curr - counts.get(p)! == 5) {
                counts.set(p, curr);
              }
            }
          }
        })
      }

      if (!toVisit.end.building || toVisit.end.building.player == player) {
        toVisit.end.paths.forEach(p => {
          if (p.road && p.road.player == player) {
            if (!visited.has(p)) {
              visited.add(p);
              counts.set(p, curr);
              queue.push(p);
            } else {
              if (curr - counts.get(p)! == 5) {
                counts.set(p, curr);
              }
            }
          }
        })
      }
    }
    let max = 0;
    visited.forEach(p => {
      const longest = counts.get(p) || 0;
      if (longest > max) {
        max = longest;
      }
    });
    return max;
  }
}
