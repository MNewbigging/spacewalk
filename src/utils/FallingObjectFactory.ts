import { CSSProperties } from 'react';
import { FallingObjectState } from '../state/FallingObjectState';
import { RandomUtils } from './RandomUtils';

export class FallingObjectFactory {
  public static createObject() {
    // Position along screen using left property
    const leftPos = RandomUtils.getRandomRangeInt(1, 80);

    const style: CSSProperties = {
      left: `${leftPos}%`,
      animationDuration: '2s',
    };

    return new FallingObjectState(style);
  }
}
