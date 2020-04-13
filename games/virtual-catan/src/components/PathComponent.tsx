import React, { useState } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

import { Path } from '../board/Path';
import { Player } from '../board/Player';


interface PathProps {
  currentUser: Player;
  path: Path;
  transX: number;
  transY: number;
  scale: number;
  outline?: boolean;
  clickPath?: (path: Path) => void;
}

const useStyles = makeStyles({
  root: {
    userSelect: 'none',
    cursor: 'pointer',
  },
  road: {
  }
});

const FILL_OPACITY = 0.6;

export default function PathComponent(props: PathProps) {
  const classes = useStyles();
  const { currentUser, transX, transY, scale, path, outline, clickPath } = props;
  const { start, end } = path;
  const [open, setOpen] = useState(false);

  const centerStart = start.position.getCenter();
  const centerEnd = end.position.getCenter();

  const startX = transX + centerStart.cartesianX() * scale;
  let startY = transY + centerStart.cartesianY() * scale;
  startY = startY - scale * (1 - 1 / Math.sqrt(3)) / 2;

  const endX = transX + centerEnd.cartesianX() * scale;
  let endY = transY + centerEnd.cartesianY() * scale;
  endY = endY - scale * (1 - 1 / Math.sqrt(3)) / 2;

  const placeRoad = () => {
    if (clickPath && path.canClickPath(currentUser)) {
      clickPath(path);
    }
  }

  const canPlaceRoad = () => {
    if (path.canPlaceRoad(currentUser)) {
      setOpen(true);
    }
  }

  const ratio = 0.7;
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const newEndX = midX + ratio * (endX - midX);
  const newEndY = midY + ratio * (endY - midY);
  const newStartX = (2 * midX - newEndX);
  const newStartY = (2 * midY - newEndY);

  const hasRoad = !!path.road;
  let fill = '#fff';
  let fillOpacity = open ? FILL_OPACITY : 0;
  if (hasRoad) {
    fillOpacity = 1;
    fill = path.road!.player.colour;
  }

  return (
    <g className={classes.root} fill={'#000'} onClick={placeRoad} onMouseOver={canPlaceRoad} onMouseOut={() => setOpen(false)}>
      <line x1={startX} y1={startY} x2={endX} y2={endY} strokeLinecap={outline ? "round" : "butt"}
        strokeWidth={outline ? 20 : 10} stroke={outline ? '#E1B56C' : '#000'} strokeOpacity={outline ? 1 : 0} />
      {!outline && <line className={clsx({ [classes.road]: hasRoad })} x1={newStartX} y1={newStartY} x2={newEndX} y2={newEndY} strokeLinecap={'butt'}
        strokeWidth={4} stroke={fill} strokeOpacity={fillOpacity} />}
    </g>
  );
}
