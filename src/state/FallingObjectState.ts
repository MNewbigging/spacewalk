import { CSSProperties } from 'react';
import { GameEventType, gameObserver } from '../events/GameObserver';
import { RandomUtils } from '../utils/RandomUtils';

// Before entering screen, during on screen, after exiting screen
enum FallingStage {
  BEFORE = 'before',
  DURING = 'during',
  AFTER = 'after',
}

export class FallingObjectState {
  public id: string;
  public stage = FallingStage.BEFORE;
  public style: CSSProperties;

  constructor(style: CSSProperties) {
    this.id = RandomUtils.createId();
    this.style = style;
  }

  public isOnscreen() {
    return this.stage === FallingStage.DURING;
  }

  public hasExitedScreen() {
    return this.stage === FallingStage.AFTER;
  }

  public enterScreen = () => {
    this.stage = FallingStage.DURING;
  };

  public exitScreen = () => {
    // Cannot exit if never entered
    // Necessary due to IO initial call
    if (this.stage === FallingStage.DURING) {
      this.stage = FallingStage.AFTER;
      gameObserver.fireEvent({ type: GameEventType.LETTER_OBJ_EXIT, id: this.id });
    }
  };
}
