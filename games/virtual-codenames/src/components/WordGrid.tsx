import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { WordState, CodeNamesGameState } from '../state';
import { GameProps } from '@virtualboardgame/core';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Word from './Word';

interface WordGridProps extends GameProps<CodeNamesGameState> {
  showAll: boolean;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    
  },
  borderOuter: {
    // padding: theme.spacing(1),
    borderRadius: '7px',
  },
  borderInner: {
    // padding: theme.spacing(1),
    borderRadius: '7px',
    borderStyle: 'solid'
  },
  row: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  item: {
    justifyContent: 'center',
  }
}));

export default function WordGrid(props: WordGridProps) {
  const classes = useStyles();
  const { words, startingPlayer } = props.state;

  let wordRows: WordState[][] = [];
  words.forEach((word, i) => {
    if (i % 5 == 0) wordRows.push([]);
    wordRows[wordRows.length - 1].push(word);
  });

  const onClick = (index: number) => {
    const newState = props.state;
    if (newState.gameEnd) return;
    if (newState.words[index].visible) return;
    newState.words[index].visible = true;

    switch (newState.words[index].layout) {
      case 'civilian':
        // End turn, change current player.
        newState.currentPlayer = !newState.currentPlayer; break;
      case 'red':
        if (newState.currentPlayer) { // If the current player is blue.
          newState.currentPlayer = !newState.currentPlayer;
        }
        newState.red--;
        if (!newState.red) {
          newState.gameEnd = true;
          newState.winner = false;
        }
        break;
      case 'blue':
        if (!newState.currentPlayer) { // If the current player is red.
          newState.currentPlayer = !newState.currentPlayer;
        }
        newState.blue--;
        if (!newState.blue) {
          newState.gameEnd = true;
          newState.winner = true;
        }
        break;
      case 'spy':
        newState.gameEnd = true;
        newState.winner = !newState.currentPlayer;
        break;
    }
    props.setState(newState);
  }

  let border = 'transparent';
  let backgroundColor = '';
  if (props.showAll) {
    border = (!startingPlayer ? '#e82830' : '#087ca8');
    backgroundColor = '#1C1B1B';
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.borderOuter} style={{
        backgroundColor: backgroundColor,
        padding: props.showAll ? '7px' : 0,
        borderColor: props.showAll ? '#383430' : 'transparent'
      }}>
        <Box className={classes.borderInner} style={{
          borderColor: border,
          padding: props.showAll ? '7px' : 0,
        }}>
          <GridList cellHeight={'auto'} className={classes.row} cols={5} spacing={10}>
            {wordRows.map((row, i) =>
              row.map((word, j) => (
                <GridListTile key={`col_${i}${j}`} className={classes.item} rows={1} cols={1}>
                  <Word key={`word_${i}${j}`} word={word} show={props.showAll || word.visible} index={i * 5 + j} onClick={onClick} />
                </GridListTile>
              )))}
          </GridList>
        </Box>
      </Box>
    </Box>
  );
}
