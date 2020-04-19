import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
});


interface ViewProps {
  children: React.ReactNode
}

function Index(props: ViewProps) {
  const classes = useStyles();

  return (<div className={classes.root}>
    {props.children}
  </div>);
}

export const AbsoluteLayout = Index;
