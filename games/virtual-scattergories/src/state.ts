
import { GameState } from '@virtualboardgame/core';

export interface ScattergoriesGameState extends GameState {
  list: number;
  timeLeft: number;
  letter: string;
  started: boolean;
  gameOver: boolean;
}

export function newGame(): ScattergoriesGameState {
  return {
    list: 0,
    timeLeft: 3 * 60, // 3 minutes
    letter: getRandomLetter(),
    started: false,
    gameOver: false
  }
}

export function getRandomLetter(): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex].toUpperCase();
}

