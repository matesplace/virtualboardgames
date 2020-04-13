import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
  },
});

interface LayoutProps {
  children: React.ReactNode
}

function Index(props: LayoutProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.children}
    </div>
  );
}

export const Layout = Index;
