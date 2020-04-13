import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import Icon from './Icon';

interface CardCountProps {
  color: string;
  count: number;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  card: {
    margin: theme.spacing(0.5),
    width: '25px',
    height: '25px',
    borderRadius: '3px'
  }
}));

export default function CardCount(props: CardCountProps) {
  const classes = useStyles();
  const { count, color } = props;

  const cards = [];
  for (let i = 0; i < count; i++) {
    cards.push(<Box key={`card_${color}_${i}`} className={classes.card}>
      <Icon show={true} icon={color} visible={true} />
    </Box>)
  }

  return (
    <Box className={classes.root}>
      {cards}
    </Box>
  );
}
