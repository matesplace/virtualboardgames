import React from 'react';

import { Tile } from '../board/Tile';
import { makeStyles } from '@material-ui/core/styles';

import { ResourceType } from '../board/ResourceType';

import WoodIcon from './resources/WoodIcon';
import WheatIcon from './resources/WheatIcon';
import SheepIcon from './resources/SheepIcon';
import BrickIcon from './resources/BrickIcon';
import OreIcon from './resources/OreIcon';

interface SeaTileProps {
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
});

export default function SeaTileComponent(props: SeaTileProps) {
  const classes = useStyles();
  const { transX, transY, scale, size, tile } = props;
  const { id, coordinate } = tile;

  const cartesianX = coordinate.cartesianX();
  const cartesianY = coordinate.cartesianY();

  const tileX = transX - (size * 2 + 2) + cartesianX * scale;
  let tileY = transY - (size * 2 + 2) + cartesianY * scale;
  tileY = tileY - scale * (1 - 1 / Math.sqrt(3)) / 2;

  const color = '#0000ff';
  const tileSize = size;

  const ports: any = [];
  tile.portLocations.forEach(port => {
    const center = port.getCenter();
    const ratio = 0.53;
    const startX = cartesianX;
    const startY = cartesianY;
    const endX = center.cartesianX();
    const endY = center.cartesianY();
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const newEndX = midX + ratio * (endX - midX);
    const newEndY = midY + ratio * (endY - midY);
    const newStartX = (2 * midX - newEndX);
    const newStartY = (2 * midY - newEndY);

    const portSize = 7;

    const portX = transX + newEndX * scale;
    let portY = transY + newEndY * scale;
    portY = portY - scale * (1 - 1 / Math.sqrt(3)) / 2;

    const endPortX = transX + newStartX * scale;
    let endPortY = transY + newStartY * scale;
    endPortY = endPortY - scale * (1 - 1 / Math.sqrt(3)) / 2;

    ports.push(<line key={`port_${port.toString()}`} stroke={'#E2B570'} strokeLinecap={'round'}
      x1={portX} y1={portY} x2={endPortX} y2={endPortY} strokeWidth={portSize} />)
  })

  const hasPort = !!tile.portLocations.length;

  let portIcon = <g />;
  let portColor = '#000';
  let portText = '3:1';
  let textTransform = '-0.5, -1';
  switch (tile.portType) {
    case ResourceType.WOOD:
      portIcon = <WoodIcon />;
      portColor = '#079B3D';
      portText = '2:1';
      break;
    case ResourceType.WHEAT:
      portIcon = <WheatIcon />;
      portColor = '#FEC149';
      portText = '2:1';
      break;
    case ResourceType.BRICK:
      portIcon = <BrickIcon />;
      portColor = '#E8632F';
      portText = '2:1';
      break;
    case ResourceType.ORE:
      portIcon = <OreIcon />;
      portColor = '#A2A8A4';
      portText = '2:1';
      break;
    case ResourceType.SHEEP:
      portIcon = <SheepIcon />;
      portColor = '#8EB636';
      portText = '2:1';
      break;
    case ResourceType.WILDCARD:
      textTransform = '0,0';
      break;
  }

  return (
    <g>
      <g>
        {ports}
      </g>
      <g id={id} className={classes.root}
        transform={`translate(${tileX},${tileY}) scale(${scale / size})`}
        width={tileSize} height={tileSize} fill={color}>
        {/* <polygon transform={`translate(${tileSize / 2}, ${tileSize / 2})`}
          points={points}></polygon> */}
        {hasPort && <g transform={`translate(${tileSize / 2}, ${tileSize / 2})`}>
          <rect rx={1} ry={1} x={-2.5} y={-2.5} width={5} height={5} fill={'#FBEDDB'} stroke={'#000'} strokeOpacity={0.5} strokeWidth={0.1} />
          <g fill={portColor} transform={`translate(1, 1) scale(0.35)`}>
            {portIcon}
          </g>
          <text
            transform={`translate(${textTransform})`}
            style={{ fontSize: '2px', fontWeight: 'bolder' }} fill={'#000'}
            alignmentBaseline={'central'} textAnchor={'middle'}>{portText}</text>
        </g>}
      </g>
    </g>
  );
}
