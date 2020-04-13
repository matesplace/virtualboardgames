import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { CatanGameState, players } from '../state';

import { User, GameProps } from '@virtualboardgame/core';

import TileComponent from './TileComponent';
import PathComponent from './PathComponent';
import IntersectionComponent from './IntersectionComponent';
import { Board } from '../board/Board';
import { Path } from '../board/Path';
import { Player } from '../board/Player';
import { PathCoordinate } from '../board/Coordinates';
import { Intersection } from '../board/Intersection';

interface HexBoardProps extends GameProps<CatanGameState> {
  currentUser: Player;
  board: Board;
  robberOn: boolean;
  resetRobber: () => void;
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: '#0F96F1',
    overflow: 'hidden',
  },
  row: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  item: {
  }
});

export default function HexBoard(props: HexBoardProps) {
  const classes = useStyles();
  const { currentUser, board, robberOn, resetRobber } = props;

  const boardSize = 300 + board.depth * 100;
  const width = boardSize;
  const height = boardSize;
  const transX = width / 2;
  const transY = height / 2;

  const tileScale = 80;
  const size = 19;

  const clickPath = (path: Path) => {
    const newState = props.state;
    let deleted = false;
    if (newState.paths[path.toString()]) {
      delete newState.paths[path.toString()];
      deleted = true;
      path.road = undefined;
    } else if (path.canPlaceRoad(currentUser)) {
      const catanPath = {
        user: currentUser.index,
        coordinate: {
          startCoord: path.start.position.toJson(),
          endCoord: path.end.position.toJson()
        }
      };
      newState.paths[path.toString()] = catanPath;
      board.placeRoad(players[currentUser.index], PathCoordinate.fromJson(catanPath.coordinate));
    }
    // Calculate longest road for all players.
    let longestPaths = players.map(p => [p.index, board.longestPath(p)]);
    longestPaths = longestPaths.sort((a: number[], b: number[]) => {
      return b[1] - a[1];
    });

    let longestRoad = longestPaths[0][1];
    longestPaths = longestPaths.filter(p => p[1] == longestRoad);

    if (longestPaths.length == 1) {
      newState.longestRoad = longestPaths[0][1];
      newState.longestPlayer = longestPaths[0][0];
    } else if (longestPaths.length > 1) {
      // Competing longest paths.
      console.log(longestPaths);


    }
    props.setState(newState, deleted);
  }

  const clickIntersection = (intersection: Intersection) => {
    const newState = props.state;
    const catanIntersection = {
      user: currentUser.index,
      isCity: false,
      coordinate: intersection.position.toJson()
    };
    const settlement = newState.intersections[intersection.toString()];
    let deleted = false;
    if (!settlement) {
      newState.intersections[intersection.toString()] = catanIntersection;
    } else if (settlement.user == currentUser.index) {
      if (!settlement.isCity) {
        settlement.isCity = true;
      } else {
        delete newState.intersections[intersection.toString()];
        deleted = true;
      }
    }
    props.setState(newState, deleted);
  }

  const clickTile = (tileIndex: number) => {
    const newState = props.state;
    if (robberOn) {
      newState.robber = tileIndex;
      resetRobber();
    }
    props.setState(newState);
  }

  let outlines: any[] = [];
  board.paths.forEach((path: Path) => {
    outlines.push(<PathComponent currentUser={currentUser} key={`outline_${path.start.toString()}${path.end.toString()}`} path={path}
      transX={transX} transY={transY} scale={tileScale} outline={true} />);
  });

  let paths: any[] = [];
  board.paths.forEach((path: Path) => {
    paths.push(<PathComponent currentUser={currentUser} key={`path_${path.start.toString()}${path.end.toString()}`} path={path}
      transX={transX} transY={transY} scale={tileScale} clickPath={clickPath} />);
  });

  let intersections: any[] = [];
  board.intersections.forEach((intersection: Intersection) => {
    intersections.push(<IntersectionComponent currentUser={currentUser} clickIntersection={clickIntersection}
      key={`intersection_${intersection.position.coord1.toString()}${intersection.position.coord2.toString()}${intersection.position.coord3.toString()}`}
      intersection={intersection} transX={transX} transY={transY} scale={tileScale} />);
  });

  return (
    <svg className={classes.root} width={'100%'} viewBox={`0 0 ${width} ${height}`} height={height}>
      {outlines}
      {board.tiles.map((tile, index) => (
        <TileComponent key={`tile_${tile.coordinate.x}${tile.coordinate.y}${tile.coordinate.z}`} tile={tile}
          transX={transX} transY={transY} scale={tileScale} size={size} robberOn={robberOn} clickTile={() => clickTile(index)} />
      ))}
      {paths}
      {intersections}
    </svg>
  );
}