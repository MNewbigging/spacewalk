import { CSSProperties } from 'react';
import { FallingObjectState } from '../state/FallingObjectState';
import { LetterObjectState } from '../state/LetterObjectState';
import { RandomUtils } from './RandomUtils';

export class LetterObjectFactory {
  public static createLetterObject() {
    // Position along screen using left property
    const leftPos = RandomUtils.getRandomRangeInt(1, 80);

    const style: CSSProperties = {
      left: `${leftPos}%`,
      animationDuration: '2s',
    };

    return new LetterObjectState(style);
  }
}
