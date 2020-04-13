import React, { useState, useEffect, useRef } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ScattergoriesGameState } from '../state';
import { GameProps } from '@virtualboardgame/core';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

interface GameControlsStateProps extends GameProps<ScattergoriesGameState> {
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignContent: 'center',
    height: '80%',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  gridItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  control: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '5rem',
    cursor: 'pointer',
  },
}));

export default function GameControls(props: GameControlsStateProps) {
  const classes = useStyles();
  const { letter, gameOver, started, timeLeft } = props.state;

  const setStarted = (started: boolean) => {
    props.setState({ started });
  }

  const setTimeLeft = (time: number) => {
    props.setState({ timeLeft: time });
  }

  useEffect(() => {
    let interval: any = null;
    if (started && timeLeft > 0) {
      interval = setInterval(() => {
        if (started && timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        }
      }, 1000);
    } else if (timeLeft == 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeLeft, started, props.newGame]);

  const beginTimer = () => {
    setStarted(true);
  }
  const resetTimer = () => {
    setStarted(false);
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Box className={classes.root}>
      <Grid container className={classes.container}>
        <Grid className={classes.gridItem} item xs={4} sm={12}>
          <Typography className={classes.letter} variant="h1">{letter}</Typography>
        </Grid>
        <Grid className={classes.gridItem}
          style={{ color: minutes == 0 && seconds < 30 ? 'red' : '' }} item xs={4} sm={12}>
          <Typography className={classes.timer} variant="h2">{`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</Typography>
        </Grid>
        <Grid item xs={4} sm={12}>
          {!gameOver && <Box>
            {!started ?
              <PlayIcon className={classes.control} onClick={beginTimer} /> :
              <PauseIcon className={classes.control} onClick={resetTimer} />}
          </Box>}
        </Grid>
      </Grid>

      {!gameOver && <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={timeLeft == 0}
        autoHideDuration={3000}
        onClose={() =>
          props.setState({ gameOver: true })}
        message={`Time's up!`} />}
    </Box>
  );
}
