import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import { Intersection } from '../board/Intersection';
import { Player } from '../board/Player';

interface IntersectionProps {
  currentUser: Player;
  intersection: Intersection;
  transX: number;
  transY: number;
  scale: number;
  clickIntersection: (intersection: Intersection) => void;
}

const useStyles = makeStyles({
  root: {
    userSelect: 'none',
    cursor: 'pointer',
    fill: '#000',
  },
  settlement: {
    stroke: '#000',
    strokeOpacity: 0.3,
  },
  city: {
  }
});

const FILL_OPACITY = 0.6;

export default function IntersectionComponent(props: IntersectionProps) {
  const classes = useStyles();
  const { currentUser, transX, transY, scale, intersection, clickIntersection } = props;
  const { position, building } = intersection;

  const [open, setOpen] = useState(false);

  const center = position.getCenter();
  const intersectionX = transX + center.cartesianX() * scale;
  let intersectionY = transY + center.cartesianY() * scale;
  intersectionY = intersectionY - scale * (1 - 1 / Math.sqrt(3)) / 2;

  const placeSettlement = () => {
    if (intersection.canClickIntersection(currentUser)) {
      clickIntersection(intersection);
    }
  };

  const canPlaceSettlement = () => {
    if (intersection.canClickIntersection(currentUser)) {
      setOpen(true);
    }
  }

  const rectSize = 5;

  const hasBuilding = !!intersection.building;
  const hasCity = hasBuilding && intersection.building!.isCity();
  let fill = '#fff';
  let fillOpacity = open ? FILL_OPACITY : 0;
  if (hasBuilding) {
    fill = intersection.building!.player.colour;
    fillOpacity = 1;
  }

  return (
    <g className={classes.root} onClick={placeSettlement} onMouseOver={canPlaceSettlement} onMouseOut={() => setOpen(false)}>
      <circle cx={intersectionX} cy={intersectionY} r={rectSize * 2} fillOpacity={0} />
      <circle className={clsx({
        [classes.settlement]: hasBuilding,
        [classes.city]: hasCity
      })} cx={intersectionX} cy={intersectionY} r={hasCity ? rectSize * 2 : rectSize} fill={fill} fillOpacity={fillOpacity} />
    </g>
  );
}
