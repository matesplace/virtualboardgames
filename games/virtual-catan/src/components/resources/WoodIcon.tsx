import React from 'react';

export default function WoodIcon() {
  return (
    <g transform='translate(-1,0)'>
      <g transform='scale(0.8)'>
        <polygon points="0,-4 1,-2 .5,-2 1.5,0 1,0 2,2 -2,2 -1,0 -1.5,0 -.5,-2 -1,-2" />
        <rect x={-.5} y={2} width={1} height={1} />
      </g>
      <g transform='translate(2.5,-1) scale(0.7)'>
        <polygon points="0,-4 1,-2 .5,-2 1.5,0 1,0 2,2 -2,2 -1,0 -1.5,0 -.5,-2 -1,-2" />
        <rect x={-.5} y={2} width={1} height={1} />
      </g>
    </g>
  );
}
