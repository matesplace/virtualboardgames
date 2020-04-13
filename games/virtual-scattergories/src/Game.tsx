import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Layout, GameProps, withGame } from '@virtualboardgame/core';
import { ScattergoriesGameState, newGame } from './state';
import WordList from './components/WordList';
import ToolbarState from './components/ToolbarState';
import GameControls from './components/GameControls';

import { words } from './words';

import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  grid: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing(2),
    height: '100%'
  },
}));

function Scattergories(props: GameProps<ScattergoriesGameState>) {
  const classes = useStyles();

  const { ...rest } = props;
  const { list, started } = props.state;

  return (
    <div>
      <Layout>
        <ToolbarState {...rest} />

        <Grid container className={classes.grid}>
          <Grid item xs={12} sm={4}>
            <GameControls {...rest} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <WordList visible={!!started} words={words[list]} {...rest} />
          </Grid>
        </Grid>
      </Layout>
    </div>);
};

export const App = withGame(Scattergories, newGame);
