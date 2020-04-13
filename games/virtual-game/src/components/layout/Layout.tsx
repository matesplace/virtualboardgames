import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../../Navbar';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  view: {
    position: 'absolute',
    width: '100%',
    height: 'calc(100vh - 48px)',
    overflow: 'hidden'
  }
});

interface LayoutProps {
  name: string;
  buttons?: React.ReactNode;
  children: React.ReactNode;
}

export default function Index(props: LayoutProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar name={props.name} buttons={props.buttons}/>
      <div className={classes.view}>
        {props.children}
      </div>
    </div>
  );
}

