import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import LinearProgress from '@material-ui/core/LinearProgress';

export interface GameState {
  game?: string;
  id?: string;
}

export interface WithoutGameProps<T extends GameState> {
  game: string;
  id: string;
  newGame?: boolean;
  state: T;
  setState: (state: Object, overwrite?: boolean) => void;
  children?: React.ReactNode;
}

export interface GameProps<T extends GameState> extends WithoutGameProps<T> {
  newGameFn: () => T;
}

function GameComponent<T extends GameState>(props: GameProps<T>) {
  const { newGame, game, state, children } = props;

  const createNewGameState = () => {
    const newGame = props.newGameFn(); // this.newGame()
    const newGameState = {
      game: props.game,
      id: uuidv4(),
      ...newGame
    }
    props.setState(newGameState, true);
  }

  React.useEffect(() => {
    if (props.newGame ||
      props.state.game !== props.game || 
      props.state.id !== props.id) {
      createNewGameState();
    }
  }, [props.newGame, props.state.game, props.state.id]);


  if (newGame) return <LinearProgress />;
  if (game !== state.game) return <LinearProgress />;
  return <React.Fragment>
    {children}
  </React.Fragment>;
}

export const withGame = <T extends GameState>(Comp: React.ComponentType<GameProps<T>>, newGame: () => T) => (props: WithoutGameProps<T>) => (
  <GameComponent<T> {...props} newGameFn={newGame}>
    <Comp {...props} newGameFn={newGame} setState={(state: any, overwrite?: boolean) =>
      props.setState({
        ...props.state,
        ...state
      }, overwrite)
    } />
  </GameComponent>
);
