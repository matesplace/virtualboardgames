import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import CloseIcon from '@material-ui/icons/Close';
import HelpOutline from '@material-ui/icons/HelpOutline';

interface IconProps {
  show: boolean;
  icon: string;
  visible: boolean;
}

const useStyles = makeStyles(theme => ({
  square: {
    display: 'flex',
    minWidth: '30px',
    width: '30px',
    height: '30px',
    borderRadius: '5px',
    background: '#F5DAC2',
    position: 'relative',
    boxShadow: '0 0 3px rgba(0, 0, 0, .5)',
  },
  civilian: {
    background: '#d8cc98',
  },
  redAgent: {
    background: '#e82830',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '11px',
      height: '11px',
      top: 'calc(50% - 5.5px)',
      left: 'calc(50% - 5.5px)',
      transform: 'rotate(45deg)',
      background: '#e82830',
      borderRadius: '1px',
      boxShadow: 'inset 0 0 7px rgba(0,0,0,.4)',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '15px',
      height: '15px',
      top: 'calc(50% - 7.5px)',
      left: 'calc(50% - 7.5px)',
      transform: 'rotate(45deg)',
      background: '#f09080',
      borderRadius: '3px',
      boxShadow: '0 0 7px 1px #f09080',
    }
  },
  blueAgent: {
    background: '#087ca8',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '11px',
      height: '11px',
      top: 'calc(50% - 5.5px)',
      left: 'calc(50% - 5.5px)',
      transform: 'rotate(45deg)',
      background: '#087ca8',
      borderRadius: '50%',
      boxShadow: 'inset 0 0 7px rgba(0,0,0,.4)',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '15px',
      height: '15px',
      top: 'calc(50% - 7.5px)',
      left: 'calc(50% - 7.5px)',
      transform: 'rotate(45deg)',
      background: '#40bce0',
      borderRadius: '50%',
      boxShadow: '0 0 7px 1px #40bce0',
    }
  },
  assasin: {
    background: '#383430',
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    // boxShadow: '0 0 10px 1px #bfbfb6',
    color: 'white'
  },
}));

export default function Icon(props: IconProps) {
  const classes = useStyles();
  const { icon, show, visible } = props;
  const isUnknown = show ? false : !visible;

  return (
    <React.Fragment>
      <Box className={clsx(classes.square, {
        [classes.redAgent]: !isUnknown && icon == 'red',
        [classes.blueAgent]: !isUnknown && icon == 'blue',
        [classes.assasin]: !isUnknown && icon == 'spy',
        [classes.civilian]: !isUnknown && icon == 'civilian',
        [classes.icon]: (!isUnknown && icon == 'spy') || isUnknown,
      })}>
        {!isUnknown && icon == 'spy' && <CloseIcon className={classes.iconCircle} />}
        {isUnknown && <HelpOutline className={classes.iconCircle} style={{color: '#fff'}} />}
      </Box>
    </React.Fragment>
  );
}
