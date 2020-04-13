

import { GameState } from '@virtualboardgame/core';

import { ResourceType } from './board/ResourceType';
import { Board } from './board/Board';
import { Player } from './board/Player';

export interface CatanCoordinate {
  x: number;
  y: number;
  z: number;
}

export interface CatanIntersectionCoordinate {
  coord1: CatanCoordinate;
  coord2: CatanCoordinate;
  coord3: CatanCoordinate;
}

export interface CatanPathCoordinate {
  startCoord: CatanIntersectionCoordinate;
  endCoord: CatanIntersectionCoordinate;
}

export interface CatanIntersection {
  user: number;
  isCity: boolean;
  coordinate: CatanIntersectionCoordinate;
}

export interface CatanPath {
  user: number;
  coordinate: CatanPathCoordinate;
}

export interface CatanGameState extends GameState {
  tiles: ResourceType[];
  rollNums: number[];
  ports: ResourceType[];
  paths: {[key: string] : CatanPath};
  intersections: {[key: string] : CatanIntersection};
  robber: number;
  longestPlayer?: number;
  longestRoad: number;
}

export const colorMap = [
  '#D80000',
  '#0B76D0',
  '#297D37',
  '#683BB5'
];

export const players = [
  new Player(colorMap[0], 0),
  new Player(colorMap[1], 1),
  new Player(colorMap[2], 2),
  new Player(colorMap[3], 3)
]

export function newGame(): CatanGameState {
  const tiles = Board.createBoard();
  const rollNums = Board.createNumbers();
  const ports = Board.createPorts();

  const robber = tiles.indexOf(ResourceType.DESERT);

  return {
    tiles,
    rollNums,
    paths: {},
    intersections: {},
    ports,
    robber,
    longestRoad: 0
  };
}