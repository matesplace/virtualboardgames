import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: '100%'
  },
});


interface ViewProps {
  children: React.ReactNode
}

function Index(props: ViewProps) {
  const classes = useStyles();

  // Declare a new state variable, which we'll call "count"
  const [scale, setScale] = useState(1);

  const onMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    let x, y;
    switch (e.deltaMode) {
      case 0x00:  // Pixel mode.
      default:
        x = e.deltaX;
        y = e.deltaY;
        break;
      case 0x01:  // Line mode.
        x = e.deltaX * 40;
        y = e.deltaY * 40;
        break;
      case 0x02:  // Page mode.
        x = e.deltaX * 125;
        y = e.deltaY * 125;
        break;
    }

    const PIXELS_PER_ZOOM_STEP = 50;
    const delta = -y / PIXELS_PER_ZOOM_STEP;

    let newScale = scale + delta;
    newScale = Math.min(Math.max(1, newScale), 3);
    setScale(newScale);

    e.preventDefault();
    e.stopPropagation();

    return false;
  }

  return (<div onWheel={onMouseWheel} className={classes.root} style={{ transform: `scale(${scale})` }}>
    {props.children}
  </div>);
}

export const ScrollLayout = Index;
