import { CSSProperties } from 'react';
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

enum Letters {
  COMMON = 'srntlcdgmphaeiou', // 3
  UNCOMMON = 'yfvb', // 2
  RARE = 'kwzjqz', // 1
}

export class LetterObjectFactory {
  private static commonWeight = 3;
  private static uncommonWeight = 2;
  private static rareWeight = 1;
  private static lettersString = LetterObjectFactory.makeLettersString();

  public static createLetterObject() {
    // Position along screen using left property
    const leftPos = RandomUtils.getRandomRangeInt(1, 80);

    // Random speed within range
    const speed = RandomUtils.getRandomRangeInt(10, 20);

    const style: CSSProperties = {
      left: `${leftPos}%`,
      animationDuration: `${speed}s`,
    };

    // Generate random letters for this object
    const minLetters = 1;
    const maxLetters = 10;
    const letterCount = RandomUtils.getRandomRangeInt(minLetters, maxLetters);

    const pickedLetters = this.pickLetters(this.lettersString, letterCount);
    const letters = this.makeLetters(pickedLetters);

    return new LetterObjectState(style, letters);
  }

  private static makeLettersString() {
    let letters = '';

    for (let i = 0; i < this.commonWeight; i++) {
      letters += Letters.COMMON;
    }

    for (let i = 0; i < this.uncommonWeight; i++) {
      letters += Letters.UNCOMMON;
    }

    for (let i = 0; i < this.rareWeight; i++) {
      letters += Letters.RARE;
    }

    return letters;
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
