import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { ScrollLayout, withGame, GameState, GameProps, User } from '@virtualboardgame/core';

import { CatanGameState, newGame, players } from './state';

import HexBoard from './components/HexBoard';
import UserChooser from './components/UserChooser';
import { Board } from './board/Board';
import { PathCoordinate, IntersectionCoordinate } from './board/Coordinates';

interface CatanLocalState {
  currentPlayerIndex: number;
  robberOn: boolean;
  board: Board;
}

function Catan(props: GameProps<CatanGameState>) {
  const { ...rest } = props;
  const [localState, setLocalState] = React.useState({
    currentPlayerIndex: 0,
    board: new Board(),
    robberOn: false
  } as CatanLocalState);
  const { currentPlayerIndex, robberOn, board } = localState;
  const currentPlayer = players[currentPlayerIndex];

  const keydownFn = (e: KeyboardEvent) => {
    if (e.keyCode === 49) {
      setLocalState({ ...localState, currentPlayerIndex: 0 });
    } else if (e.keyCode == 50) {
      setLocalState({ ...localState, currentPlayerIndex: 1 });
    } else if (e.keyCode == 51) {
      setLocalState({ ...localState, currentPlayerIndex: 2 });
    } else if (e.keyCode == 52) {
      setLocalState({ ...localState, currentPlayerIndex: 3 });
    } else if (e.keyCode == 55) {
      setLocalState({ robberOn: true, ...localState });
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", keydownFn, false);

    return () => {
      document.removeEventListener("keydown", keydownFn, false);
    };
  }, []);

  const onGameStateUpdate = (newState: CatanGameState) => {
    // console.log('Recunstruct board');
    players.forEach(player => player.reset());

    const { tiles, rollNums, ports, intersections, paths, robber, longestPlayer, longestRoad } = newState;
    board.construct(tiles, rollNums, ports);
    Object.values(paths).forEach(path => {
      board.placeRoad(players[path.user], PathCoordinate.fromJson(path.coordinate));
    })
    Object.values(intersections).forEach(intersection => {
      if (intersection.isCity) {
        board.placeCity(players[intersection.user],
          IntersectionCoordinate.fromJson(intersection.coordinate));
      } else {
        board.placeSettlement(players[intersection.user],
          IntersectionCoordinate.fromJson(intersection.coordinate));
      }
    })
    board.moveRobber(robber);
    board.longestPlayer = longestPlayer;
    board.currentLongestRoad = longestRoad;
  }

  onGameStateUpdate(props.state);

  return (<ScrollLayout>
    <UserChooser board={board} robberOn={robberOn} current={currentPlayerIndex}
      setCurrent={(index) => setLocalState({ ...localState, currentPlayerIndex: index })}
      setRobber={(robberOn) => setLocalState({ ...localState, robberOn })} />
    <HexBoard {...rest} currentUser={currentPlayer} robberOn={robberOn} board={board}
      resetRobber={() => setLocalState({ ...localState, robberOn: false })} />
  </ScrollLayout>);
}

export const App = withGame(Catan, newGame);
