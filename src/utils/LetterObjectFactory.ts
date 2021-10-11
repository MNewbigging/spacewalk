import { CSSProperties } from 'react';
import { LetterObjectState } from '../state/LetterObjectState';
import { RandomUtils } from './RandomUtils';

export class LetterObjectFactory {
  public static createLetterObject() {
    // Position along screen using left property
    const leftPos = RandomUtils.getRandomRangeInt(1, 80);

    const style: CSSProperties = {
      left: `${leftPos}%`,
      animationDuration: '10s',
    };

    // Generate random letters for this object
    const minLetters = 1;
    const maxLetters = 3;
    const letterCount = RandomUtils.getRandomRangeInt(minLetters, maxLetters);

    const letters = RandomUtils.getRandomLetters(letterCount);

    return new LetterObjectState(style, letters);
  }
}
