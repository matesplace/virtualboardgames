import React from 'react';
import clsx from 'clsx';

import { Tile } from '../board/Tile';
import SeaTileComponent from './SeaTileComponent';
import { makeStyles } from '@material-ui/core/styles';
import { ResourceType } from '../board/ResourceType';

import WoodIcon from './resources/WoodIcon';
import WheatIcon from './resources/WheatIcon';
import SheepIcon from './resources/SheepIcon';
import BrickIcon from './resources/BrickIcon';
import OreIcon from './resources/OreIcon';
import RobberIcon from './resources/RobberIcon';


interface TileProps {
  robberOn: boolean;
  clickTile: (tile: Tile) => void;
  tile: Tile;
  transX: number;
  transY: number;
  scale: number;
  size: number;
}

const useStyles = makeStyles({
  root: {
    userSelect: 'none',
  },
  hasClick: {
    cursor: 'pointer',
  },
  icon: {
    fill: '#000',
    fillOpacity: 0.2,
  },
  hex: {
    strokeWidth: 0.2,
    stroke: '#000',
    strokeOpacity: 0.4
  },
  hexInner: {
    strokeWidth: 1,
    stroke: '#fff',
    strokeOpacity: 0.3
  }
});

export default function TileComponent(props: TileProps) {
  const classes = useStyles();
  const { transX, transY, scale, size, tile, robberOn, clickTile } = props;
  const { coordinate, rollNum, tileType, hasRobber } = tile;
  const numDots = 6 - Math.abs(rollNum - 7);
  const isDessert = tileType == ResourceType.DESERT;

  const cartesianX = coordinate.cartesianX();
  const cartesianY = coordinate.cartesianY();

  const tileX = transX - (size * 2 + 2) + cartesianX * scale;
  let tileY = transY - (size * 2 + 2) + cartesianY * scale;
  tileY = tileY - scale * (1 - 1 / Math.sqrt(3)) / 2;

  let color = '';
  switch (tileType) {
    case ResourceType.BRICK: color = '#E5632C'; break;
    case ResourceType.WHEAT: color = '#FCC13F'; break;
    case ResourceType.ORE: color = '#A2A8A4'; break;
    case ResourceType.WOOD: color = '#079B3D'; break;
    case ResourceType.SHEEP: color = '#8FB627'; break;
    case ResourceType.DESERT: color = '#DAD399'; break;
  }

  const id = tile.id;

  const point: number[][] = [
    [Math.sqrt(3) / 2, 1 / 2],
    [0, 1],
    [-Math.sqrt(3) / 2, 1 / 2],
    [-Math.sqrt(3) / 2, -1 / 2],
    [0, -1],
    [Math.sqrt(3) / 2, -1 / 2]];

  const points = point.map(p => p.map(p0 => p0 * 10)).map(p => `${p[0]},${p[1]}`).join(' ');
  // const points = tile.intersections.map(i => i.position.getCenter()).map(c => `${c.cartesianX()},${c.cartesianY()}`).join(' ');

  const tileSize = size;

  const dots = [];
  const textColor = numDots > 4 ? '#ff0000' : '#000';
  for (var i = 0; i < numDots; i++) {
    dots.push(<circle key={`dot_${i}`} cx={i * 0.8} cy={0} r={0.25} fill={textColor} />);
  }

  let tileIcon = <g />;
  switch (tileType) {
    case ResourceType.BRICK:
      tileIcon = <BrickIcon />;
      break;
    case ResourceType.WOOD:
      tileIcon = <WoodIcon />;
      break;
    case ResourceType.SHEEP:
      tileIcon = <SheepIcon />;
      break;
    case ResourceType.ORE:
      tileIcon = <OreIcon />;
      break;
    case ResourceType.WHEAT:
      tileIcon = <WheatIcon />;
      break;
  }

  const onClick = () => {
    if (robberOn) {
      clickTile(tile);
    }
  }

  if (tileType == ResourceType.SEA) {
    return <SeaTileComponent tile={tile} transX={transX} transY={transY} scale={scale} size={size}/>
  }

  return (
    <g id={id} className={clsx(classes.root, {
      [classes.hasClick]: robberOn,
    })} onClick={onClick} transform={`translate(${tileX},${tileY}) scale(${scale / size})`} width={tileSize} height={tileSize} fill={color}>
      <polygon transform={`translate(${tileSize / 2}, ${tileSize / 2})`} className={classes.hex}
        points={points}></polygon>
      <polygon transform={`translate(${tileSize / 2}, ${tileSize / 2})`} className={classes.hexInner}
        points={points}></polygon>
      <g transform={`translate(${tileSize / 2}, ${tileSize * 2 / 6})`} className={classes.icon}>{tileIcon}</g>
      {!isDessert && <g transform={`translate(${tileSize / 2}, ${tileSize * 2 / 3})`}>
        <rect rx={1} ry={1} x={-3} y={-3} width={6} height={6} fill={'#FBEDDB'} stroke={'#000'} strokeOpacity={0.5} strokeWidth={0.1} />
        <g transform={`translate(${-(numDots - 1) * 0.8 / 2}, 2.2)`}>{dots}</g>
        <text
          style={{ fontSize: '4px', fontWeight: 'bolder' }} fill={textColor}
          alignmentBaseline={'central'} textAnchor={'middle'}>{rollNum}</text>
      </g>}
      {hasRobber && <g transform={`translate(${tileSize / 2 + 1.2}, ${tileSize * 2 / 3 - 1.8})`}>
        <RobberIcon fill={'#4A5358'}/>
      </g>}
    </g>
  );
}
