import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import { ScattergoriesGameState } from '../state';
import { GameProps } from '@virtualboardgame/core';


import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

interface WordProps extends GameProps<ScattergoriesGameState> {
  words: string[];
  visible: boolean;
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: theme.spacing(1)
  },
  grid: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing(2)
  },
  rootBox: {
    padding: theme.spacing(1),
    borderRadius: '5px'
  },
  root: {
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '10px',
    userSelect: 'none',
  },
  text: {
    fontWeight: 'bolder',
  },
  listHidden: {
    backgroundColor: '#000'
  }
}));

export default function WordList(props: WordProps) {
  const classes = useStyles();
  const { words, visible, ...rest } = props;

  return (
    <Box className={classes.container}>
      <Box className={classes.rootBox}>
        <List className={classes.root}>
          {words.map((word, index) => (
            <React.Fragment key={`word_${index}`}>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <div>{index + 1}</div>
                </ListItemIcon>
                <ListItemText primary={word} primaryTypographyProps={{
                  className: clsx(classes.text, {
                    [classes.listHidden]: !visible
                  })
                }} />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
}
