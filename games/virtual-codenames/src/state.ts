
import { GameState } from '@virtualboardgame/core';

import { words } from './words';

export interface WordState {
  word: string;
  layout: string;
  visible: boolean;
}

export interface CodeNamesGameState extends GameState {
  words: WordState[];
  startingPlayer: boolean; // Red = true, Blue = false
  currentPlayer: boolean; // Red = true, Blue = false
  red: number;
  blue: number;
  winner?: boolean;
  gameEnd: boolean;
  timeLeft: number;
}

export function newGame(): CodeNamesGameState {
  const words = getRandomWords();
  const startingPlayer = getRandomStartingPlayer();
  const layout = getRandomLayout(startingPlayer);

  const wordState = [];
  for (var i = 0; i < words.length; i++) {
    wordState.push({
      word: words[i],
      layout: layout[i],
      visible: false
    });
  }
  return {
    words: wordState,
    startingPlayer,
    currentPlayer: startingPlayer,
    red: !startingPlayer ? 9 : 8,
    blue: startingPlayer ? 9 : 8,
    gameEnd: false,
    timeLeft: -1
  }
}

function shuffle(array: string[]) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getRandomWords() {
  shuffle(words);
  return words.slice(0, 25);
}

function getRandomStartingPlayer() {
  return Math.floor(Math.random() * 2) ? true : false;
}

function getRandomLayout(startingPlayer: boolean) {
  let maxBlue = 9;
  let maxRed = 8;
  if (!startingPlayer) {
    maxRed++;
    maxBlue--;
  }
  let layout = ['spy'];
  for (var i = 0; i < 7; i++) layout.push('civilian');
  for (var i = 0; i < maxBlue; i++) layout.push('blue');
  for (var i = 0; i < maxRed; i++) layout.push('red');

  return shuffle(layout);
}
