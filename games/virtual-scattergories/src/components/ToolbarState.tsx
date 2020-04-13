import React, { useState, useEffect, useRef } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ScattergoriesGameState } from '../state';
import { GameProps } from '@virtualboardgame/core';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


interface ToolbarStateProps extends GameProps<ScattergoriesGameState> {
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
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
  },
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
  const { list } = props.state;

  const setValue = (value?: number) => {
    if (value) {
      const newState = props.newGameFn();
      newState.list = value;
      props.setState(newState, true);
    }
  }

  return (
    <Box className={classes.root}>
      <Paper elevation={0} className={classes.icons}>
        <StyledToggleButtonGroup exclusive value={list} size="small" color="primary" aria-label="button group"
          onChange={(e: React.MouseEvent<HTMLElement>, value: any) => setValue(value)}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
            <ToggleButton key={`level_${num}`} value={num - 1}>
              {num}
            </ToggleButton>
          ))}
        </StyledToggleButtonGroup>
      </Paper>
    </Box>
  );
}
