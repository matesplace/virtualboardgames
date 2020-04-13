import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { WordState } from '../state';

import Icon from './Icon';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

interface WordProps {
  word: WordState;
  show: boolean;
  index: number;
  onClick: (index: number) => void;
}

const useStyles = makeStyles(theme => ({
  rootBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  root: {
    backgroundColor: '#F4DAC1',
    borderRadius: '5px',
    padding: '10px',
    userSelect: 'none',
    cursor: 'pointer',
    width: '200px',
    maxWidth: '200px'
  },
  inner: {
    border: '2px solid rgba(0,0,0,0.2)',
    borderRadius: '5px',
    padding: '5px !important',
    [theme.breakpoints.down('xs')]: {
      border: 'none'
    }
  },
  upper: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  },
  icon: {
    width: '30px',
    height: '30px',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5px',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0
    }
  },
  iconCircle: {
    color: 'rgba(255,255,255,0.8)'
  },
  upside: {
    transform: 'rotate(-180deg)',
    color: 'rgba(0,0,0,0.2)',
    textTransform: 'uppercase',
    fontWeight: 'bolder',
    fontStyle: 'italic',
    fontSize: '12pt',
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  hr: {
    border: '0.5px solid rgba(0,0,0,0.2)',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  main: {
    backgroundColor: '#F6F9F6',
    borderRadius: '5px',
    padding: '5px',
    fontWeight: 'bolder',
    textTransform: 'uppercase',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  mainVisible: {
    opacity: 0.5
  }
}));

export default function Word(props: WordProps) {
  const classes = useStyles();
  const { word: wordState } = props;
  const { word, layout: icon, visible } = wordState;
  let border = '';
  if (visible) {
    switch (icon) {
      case 'red': border = '#e82830'; break;
      case 'blue': border = '#087ca8'; break;
      case 'civilian': border = '#B6B999'; break;
      case 'spy': border = '#383430'; break;
    }
  }

  const onClick = () => {
    props.onClick(props.index);
  }
  return (
    <Box className={classes.rootBox}>
      <Card className={classes.root} style={{ backgroundColor: border }} onClick={onClick}>
        <CardContent className={classes.inner} >
          <Box className={classes.upper}>
            <Typography variant="h5" component="h2" className={classes.upside}>
              {word}
            </Typography>
            <Icon icon={icon} show={props.show} visible={visible} />
          </Box>
          <hr className={classes.hr} />
          <Typography variant="h5" component="h2" className={clsx(classes.main, {
            [classes.mainVisible]: visible,
          })}>
            {word}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
