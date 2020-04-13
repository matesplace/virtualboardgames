import { utils } from '@virtualboardgame/core';

import { HexCoordinate, IntersectionCoordinate, PathCoordinate } from './Coordinates';
import { Path } from './Path';
import { Player } from './Player';
import { Intersection } from './Intersection';
import { Tile } from './Tile';
import { ResourceType } from './ResourceType';

import { CatanPath } from '../state';
import { Port } from './Port';

export class Board {
  public tiles: Tile[];
  public intersections: Map<IntersectionCoordinate, Intersection>;
  public paths: Map<PathCoordinate, Path>;

  public depth: number;

  public static ROLL_NUMS = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8,
    10, 9, 4, 5, 6, 3, 11];
  public static STANDARD_ROLL_NUMS = [9, 12, 11, 4, 8, 5, 2, 6, 3,
    8, 10, 5, 6, 3, 10, 9, 4, 11].reverse();
  public static STANDARD_ROLL_NUMS2 = 'ab6d8fghij8lmno6qr'.split('');

  public longestPlayer?: number;
  public currentLongestRoad: number = 0;

  constructor(depth = 2) {
    this.tiles = [];
    this.intersections = new Map<IntersectionCoordinate, Intersection>();
    this.paths = new Map<PathCoordinate, Path>();
    this.depth = depth;

    // this.construct(Board.standardBoard(), Board.ROLL_NUMS);
    // this.construct(Board.createBoard(this.depth), Board.createNumbers(this.depth));
  }

  construct(tileTypes: ResourceType[], rollNums: number[], ports: ResourceType[]) {
    const intersections: Map<IntersectionCoordinate, Intersection> =
      new Map<IntersectionCoordinate, Intersection>();
    const paths: Map<PathCoordinate, Path> =
      new Map<PathCoordinate, Path>();
    this.tiles = [];

    const maxNum = rollNums.length;

    let currDepth = this.depth;
    let currRoll = 0, currTile = 0;
    let x = this.depth, y = 0, z = 0;

    while (currDepth >= 0) {
      currRoll = this.addTile(tileTypes[currTile], new HexCoordinate(x, y, z),
        intersections, paths, currRoll, rollNums);
      currTile++;

      for (let i = 0; i < currDepth; i++) {
        y++;
        currRoll = this.addTile(tileTypes[currTile],
          new HexCoordinate(x, y, z), intersections, paths, currRoll,
          rollNums);
        currTile++;
      }

      for (let i = 0; i < currDepth; i++) {
        x--;
        currRoll = this.addTile(tileTypes[currTile],
          new HexCoordinate(x, y, z), intersections, paths, currRoll,
          rollNums);
        currTile++;
      }

      for (let i = 0; i < currDepth; i++) {
        z++;
        currRoll = this.addTile(tileTypes[currTile],
          new HexCoordinate(x, y, z), intersections, paths, currRoll,
          rollNums);
        currTile++;
      }

      for (let i = 0; i < currDepth; i++) {
        y--;
        currRoll = this.addTile(tileTypes[currTile],
          new HexCoordinate(x, y, z), intersections, paths, currRoll,
          rollNums);
        currTile++;
      }

      for (let i = 0; i < currDepth; i++) {
        x++;
        currRoll = this.addTile(tileTypes[currTile],
          new HexCoordinate(x, y, z), intersections, paths, currRoll,
          rollNums);
        currTile++;
      }

      for (let i = 1; i < currDepth; i++) {
        z--;
        currRoll = this.addTile(tileTypes[currTile],
          new HexCoordinate(x, y, z), intersections, paths, currRoll,
          rollNums);
        currTile++;
      }
      z--;
      x--;
      currDepth--;
    }

    this.intersections = intersections;
    this.paths = paths;

    let i = 0;
    const portLocations = Board.standardPortLocations();
    // Adds sea tiles and ports
    let seaCoords = this.getSeaPermutations();
    seaCoords.forEach((coord, index) => {
      const seaTile = new Tile(0, coord, intersections, paths, ResourceType.SEA);
      if (portLocations.some(p => p.equals(coord))) {
        seaTile.setPort(new Port(ports[index]));
      }
      this.tiles.push(seaTile);
    })
  }

  private addTile(tileType: ResourceType, coord: HexCoordinate,
    intersections: Map<IntersectionCoordinate, Intersection>,
    paths: Map<PathCoordinate, Path>, currRoll: number, rollNums: number[]) {
    if (tileType != ResourceType.DESERT) {
      this.tiles.push(new Tile(rollNums[currRoll], coord, intersections, paths, tileType));
      return currRoll + 1;
    } else {
      this.tiles.push(new Tile(0, coord, intersections, paths, tileType));
      return currRoll;
    }
  }

  private getSeaPermutations(): HexCoordinate[] {
    let coords: HexCoordinate[] = [];
    let oneThree = [0, 0, 3];
    let oneThreeOneTwo = [0, 2, 3];
    let oneThreeOneOne = [0, 1, 3];
    let twoThree = [0, 3, 3];

    coords.push(new HexCoordinate(oneThree[0], oneThree[1], oneThree[2]));
    while (this.permute(oneThree)) {
      coords.push(new HexCoordinate(oneThree[0], oneThree[1], oneThree[2]));
    }

    coords.push(new HexCoordinate(oneThreeOneTwo[0], oneThreeOneTwo[1],
      oneThreeOneTwo[2]));
    while (this.permute(oneThreeOneTwo)) {
      coords.push(new HexCoordinate(oneThreeOneTwo[0], oneThreeOneTwo[1],
        oneThreeOneTwo[2]));
    }

    coords.push(new HexCoordinate(oneThreeOneOne[0], oneThreeOneOne[1],
      oneThreeOneOne[2]));
    while (this.permute(oneThreeOneOne)) {
      coords.push(new HexCoordinate(oneThreeOneOne[0], oneThreeOneOne[1],
        oneThreeOneOne[2]));
    }

    coords.push(new HexCoordinate(twoThree[0], twoThree[1], twoThree[2]));
    while (this.permute(twoThree)) {
      coords.push(new HexCoordinate(twoThree[0], twoThree[1], twoThree[2]));
    }

    return coords;
  }

  private permute(data: number[]) {
    let k = data.length - 2;
    while (data[k] >= data[k + 1]) {
      k--;
      if (k < 0) {
        return false;
      }
    }
    let l = data.length - 1;
    while (data[k] >= data[l]) {
      l--;
    }
    this.swap(data, k, l);
    let length = data.length - (k + 1);
    for (let i = 0; i < length / 2; i++) {
      this.swap(data, k + 1 + i, data.length - i - 1);
    }
    return true;
  }

  private swap(data: number[], index1: number, index2: number) {
    let tmp = data[index1];
    data[index1] = data[index2];
    data[index2] = tmp;
  }

  static standardBoard() {
    let tiles: ResourceType[] = [];
    tiles.push(ResourceType.ORE);
    tiles.push(ResourceType.SHEEP);
    tiles.push(ResourceType.WOOD);
    tiles.push(ResourceType.BRICK);
    tiles.push(ResourceType.ORE);
    tiles.push(ResourceType.SHEEP);
    tiles.push(ResourceType.SHEEP);
    tiles.push(ResourceType.WHEAT);
    tiles.push(ResourceType.BRICK);
    tiles.push(ResourceType.WOOD);
    tiles.push(ResourceType.WHEAT);
    tiles.push(ResourceType.WHEAT);
    tiles.push(ResourceType.BRICK);
    tiles.push(ResourceType.SHEEP);
    tiles.push(ResourceType.WOOD);
    tiles.push(ResourceType.WHEAT);
    tiles.push(ResourceType.ORE);
    tiles.push(ResourceType.WOOD);
    tiles.push(ResourceType.DESERT);
    return tiles;
  }

  static standardPorts() {
    let ports: ResourceType[] = [];
    ports.push(ResourceType.WILDCARD);
    ports.push(ResourceType.SHEEP);
    ports.push(ResourceType.WILDCARD);
    ports.push(ResourceType.WHEAT);
    ports.push(ResourceType.BRICK);
    ports.push(ResourceType.WILDCARD);
    ports.push(ResourceType.ORE);
    ports.push(ResourceType.WILDCARD);
    ports.push(ResourceType.WOOD);
    return ports;
  }

  static standardPortLocations(): HexCoordinate[] {
    let ports: HexCoordinate[] = [];
    ports.push(new HexCoordinate(0, 0, 3));
    ports.push(new HexCoordinate(0, 2, 3));
    ports.push(new HexCoordinate(0, 3, 2));
    ports.push(new HexCoordinate(0, 3, 0));
    ports.push(new HexCoordinate(2, 3, 0));
    ports.push(new HexCoordinate(3, 2, 0));
    ports.push(new HexCoordinate(3, 0, 0));
    ports.push(new HexCoordinate(3, 0, 2));
    ports.push(new HexCoordinate(2, 0, 3));
    return ports;
  }

  static createBoard(depth = 2) {
    let tiles: ResourceType[] = [];
    for (var i = 0; i < 4 + ((depth - 2) * 2); i++) tiles.push(ResourceType.SHEEP);
    for (var i = 0; i < 4 + ((depth - 2) * 2); i++) tiles.push(ResourceType.WHEAT);
    for (var i = 0; i < 4 + ((depth - 2) * 2); i++) tiles.push(ResourceType.WOOD);
    for (var i = 0; i < 3 + ((depth - 2) * 2); i++) tiles.push(ResourceType.BRICK);
    for (var i = 0; i < 3 + ((depth - 2) * 2); i++) tiles.push(ResourceType.ORE);
    for (var i = 0; i < depth - 1; i++) tiles.push(ResourceType.DESERT);
    utils.shuffle(tiles);
    return tiles;
  }

  static createPorts(depth = 2) {
    let ports = Board.standardPorts();
    utils.shuffle(ports);
    return ports;
  }

  static defaultNumbers(depth = 2) {
    // A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R
    return [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];
  }

  // static createNumbers(depth = 2): number[] {
  //   let numbers: number[] = [];
  //   for (var i = 0; i < depth; i++) {
  //     for (var j = 1; j < 5; j++) {
  //       numbers.push(7 + j);
  //       numbers.push(7 - j);
  //     }
  //   }
  //   while (depth > 1) {
  //     numbers.push(12);
  //     numbers.push(2);
  //     depth--;
  //   }
  //   utils.shuffle(numbers);
  //   return numbers;
  // }

  static createNumbers(depth = 2): number[] {
    const numbers = Board.ROLL_NUMS.slice();
    return numbers;
    // return utils.rotate(numbers, numbers.length - 2, false);
  }


  moveRobber(robberIndex: number) {
    this.tiles.forEach((tile, index) => {
      if (index == robberIndex) {
        tile.setRobber(true);
      }
    })
  }

  placeRoad(user: Player, pathCoordinate: PathCoordinate) {
    const path = Array.from(this.paths.keys())
      .filter(p => p.equals(pathCoordinate)).map(k => this.paths.get(k));
    if (path[0]) {
      path[0].placeRoad(user);
      user.buildRoad();
    }
  }

  placeSettlement(user: Player, intersectionCoordinate: IntersectionCoordinate) {
    const intersection = Array.from(this.intersections.keys())
      .filter(p => p.equals(intersectionCoordinate)).map(k => this.intersections.get(k));
    if (intersection[0]) {
      intersection[0].placeSettlement(user);
      user.buildSettlement();
    }
  }

  placeCity(user: Player, intersectionCoordinate: IntersectionCoordinate) {
    const intersection = Array.from(this.intersections.keys())
      .filter(p => p.equals(intersectionCoordinate)).map(k => this.intersections.get(k));
    if (intersection[0]) {
      intersection[0].placeCity(user);
      user.buildCity();
    }
  }

  getTotals(user: number) {
    let count = 0;
    this.intersections.forEach(intersection => {
      if (intersection.building && intersection.building.player.index == user) {
        count += (intersection.building.isCity() ? 2 : 1);
      }
    })
    // Has longest road?
    if (this.longestPlayer == user) {
      count += 2;
    }
    
    return count;
  }

  longestPath(player: Player) {
    let max = 0;
    this.paths.forEach(path => {
      const longestPath = path.getLongestPath(player);
      if (longestPath > max) {
        max = longestPath;
      }
    })
    return max;
  }
}
