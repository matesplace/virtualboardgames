import React from 'react';

import { WithoutGameProps } from '@virtualboardgame/core';

// To add a new game, import your new game here,
// and then add it to the games list below.
import { App as Catan } from '@virtualboardgame/catan';
import { App as Codenames } from '@virtualboardgame/codenames';
import { App as Scattergories } from '@virtualboardgame/scattergories';

export const games: GameEntry[] = [
  {
    id: 'catan',
    name: 'Catan',
    app: Catan
  },
  {
    id: 'codenames',
    name: 'CODENAMES',
    app: Codenames
  },
  {
    id: 'scattergories',
    name: 'Scattergories',
    app: Scattergories
  }
];

export interface GameEntry {
  id: string;
  name: string;
  app: React.ComponentType<WithoutGameProps<any>>;
}
