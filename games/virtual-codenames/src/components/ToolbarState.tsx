import React, { useState, useEffect, useRef } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { CodeNamesGameState } from '../state';
import { GameProps } from '@virtualboardgame/core';

import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Badge from '@material-ui/core/Badge';

import AlarmAdd from '@material-ui/icons/AlarmAdd';
import AlarmOff from '@material-ui/icons/AlarmOff';
import Person from '@material-ui/icons/Person';
import Policy from '@material-ui/icons/Policy';
import SwapHoriz from '@material-ui/icons/SwapHoriz';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import CardCount from './CardCount';

interface ToolbarStateProps extends GameProps<CodeNamesGameState> {
  showAll: boolean;
  setRole: (spy: boolean) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    alignItems: 'center',
    paddingBottom: 0
  },
  cards: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '7px',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    cursor: 'pointer',
    userSelect: 'none',
    color: 'white'
  },
  winner: {
    display: 'flex',
    padding: theme.spacing(1),
  },
  chips: {
    display: 'none',
    margin: theme.spacing(0.5),
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
  },
  icons: {
    flexShrink: 0,
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'nowrap',
  },
  buttonGroup: {
    margin: theme.spacing(1),
  },
  divider: {
    alignSelf: 'stretch',
    height: 'auto',
    margin: theme.spacing(1, 0.5),
  },
  count: {
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    padding: theme.spacing(0, 1),
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);


export default function ToolbarState(props: ToolbarStateProps) {
  const classes = useStyles();
  const { currentPlayer, red, blue, gameEnd, winner, timeLeft } = props.state;

  const endCurrentTurn = () => {
    const newState = props.state;
    newState.currentPlayer = !newState.currentPlayer;
    props.setState(newState);
  }

  const setTimeLeft = (time: number) => {
    const newState = props.state;
    newState.timeLeft = time;
    props.setState(newState);
  }

  useEffect(() => {
    let interval: any = null;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        }
      }, 1000);
    } else if (timeLeft == 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeLeft, props.newGame]);

  const beginTimer = () => {
    setTimeLeft(60);
  }
  const resetTimer = () => {
    setTimeLeft(-1);
  }

  return (
    <Box className={classes.root}>
      <div className={classes.cards}>
        <div className={classes.count}>
          <CardCount color={'red'} count={red} />
        </div>
        <div className={classes.chips}>
          <Chip color="secondary" size="small" label={red} />
        </div>
        <div className={classes.count}>
          <CardCount color={'blue'} count={blue} />
        </div>
        <div className={classes.chips}>
          <Chip color="primary" size="small" label={blue} />
        </div>
      </div>

      <Paper elevation={0} className={classes.icons}>

        {!gameEnd && <div className={classes.status} >
          <Chip color={currentPlayer ? 'primary' : 'secondary'} label={!currentPlayer ? `Red's turn` : `Blue's turn`} />
        </div>}

        {gameEnd && <div className={classes.winner}
          style={{ color: winner ? '#0582AC' : '#EB2D34' }}>
          {!winner ? `Red wins` : `Blue wins`}
        </div>}

        <IconButton color="primary" onClick={endCurrentTurn}>
          <SwapHoriz />
        </IconButton>

        <IconButton color="secondary">
          <Badge badgeContent={timeLeft > 0 ? timeLeft : undefined} color="secondary">
            {timeLeft && timeLeft < 0 ?
              <AlarmAdd onClick={beginTimer} /> :
              <AlarmOff onClick={resetTimer} />}
          </Badge>
        </IconButton>

        <Divider orientation="vertical" className={classes.divider} />

        <Hidden smDown>
          <ButtonGroup className={classes.buttonGroup} color="primary" size="small" aria-label="small button group">
            <Button variant={!props.showAll ? 'contained' : undefined} onClick={() => props.setRole(false)}> Player</Button>
            <Button variant={props.showAll ? 'contained' : undefined} onClick={() => props.setRole(true)}>Spy Master</Button>
          </ButtonGroup>
        </Hidden>

        <Hidden mdUp>
          <StyledToggleButtonGroup exclusive value={props.showAll} size="small" color="primary" aria-label="button group"
            onChange={(e: React.MouseEvent<HTMLElement>, value: any) => props.setRole(value)}>
            <ToggleButton value={false}>
              <Person />
            </ToggleButton>
            <ToggleButton value={true}>
              <Policy />
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Hidden>
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={timeLeft == 0}
        autoHideDuration={3000}
        onClose={() => setTimeLeft(-1)}
        message={`Time's up!`} />
    </Box>
  );
}
