import { CSSProperties } from 'react';
import { GameStage } from '../state/GameStageState';
import { LetterObjectState } from '../state/LetterObjectState';
import { RandomUtils } from './RandomUtils';

export enum LetterHighlightState {
  NONE = 'none',
  HIGHLIGHT = 'highlight',
  WARN = 'warn',
}

export interface Letter {
  char: string;
  highlight: LetterHighlightState;
}

export class LetterObjectFactory {
  public static createLetterObject(gameStage: GameStage) {
    // Position along screen using left property
    const leftPos = RandomUtils.getRandomRangeInt(1, 80);

    // Random speed within range
    const speed = RandomUtils.getRandomRangeInt(15, 20);

    const style: CSSProperties = {
      left: `${leftPos}%`,
      animationDuration: `${speed}s`,
    };

    // Generate random letters for this object
    const minLetters = gameStage.groupMin;
    const maxLetters = gameStage.groupMax;
    const letterCount = RandomUtils.getRandomRangeInt(minLetters, maxLetters);

    const pickedLetters = this.pickLetters(gameStage.letterPool, letterCount);
    const letters = this.makeLetters(pickedLetters);

    return new LetterObjectState(style, letters);
  }

  private static pickLetters(lettersString: string, letterCount: number) {
    let picked = '';

    for (let i = 0; i < letterCount; i++) {
      picked += lettersString.charAt(Math.floor(Math.random() * lettersString.length));
    }

    return picked;
  }

  private static makeLetters(pickedLetters: string) {
    return pickedLetters.split('').map((char) => ({
      char,
      highlight: LetterHighlightState.NONE,
    }));
  }
}
