import React from 'react';


export default function RobberIcon(props: any) {
  return (
    <g {...props}>
      <circle r={1} />
      <circle cy={1.6} r={1.4} />
      <circle cy={2.6} r={1.1} />
    </g>
  );
}
