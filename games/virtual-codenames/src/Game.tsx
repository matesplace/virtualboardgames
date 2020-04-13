import React from 'react';

import { Layout, GameProps, withGame } from '@virtualboardgame/core';
import { CodeNamesGameState, newGame } from './state';
import WordGrid from './components/WordGrid';
import ToolbarState from './components/ToolbarState';


function Codenames(props: GameProps<CodeNamesGameState>) {
  const [spy, setSpy] = React.useState(false);
  const { ...rest } = props;

  React.useEffect(() => {
    setSpy(false);
  }, [props.state.id]);

  return (
    <div>
      <Layout>
        <ToolbarState {...rest} showAll={spy!} setRole={(spy) => setSpy(spy)} />
        <WordGrid {...rest} showAll={spy!} />
      </Layout>
    </div>);
}

export const App = withGame(Codenames, newGame);
