import React from 'react';

import Word from './components/Word';
import { Layout } from '@virtualboardgame/core';

function CodeNames() {
  return (
    <Layout>
      <header className="App-header">
        <p>
          Code Names
        </p>
        <Word word="Hello"/>
      </header>
    </Layout>
  );
}

export const Game = CodeNames;
