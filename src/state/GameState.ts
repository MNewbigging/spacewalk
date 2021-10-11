import { observable } from 'mobx';
import { FallingObjectFactory } from '../utils/FallingObjectFactory';
import { RandomUtils } from '../utils/RandomUtils';
import { FallingObjectState } from './FallingObjectState';

export class GameState {
  @observable public letterObjects: FallingObjectState[] = [];

  constructor() {
    this.queueLetterObject();
  }

  private queueLetterObject() {
    // Set timeout for next letter object to be added
    const minDelay = 1000;
    const maxDelay = 5000;

    setTimeout(this.addLetterObject, RandomUtils.getRandomRangeFloat(minDelay, maxDelay));
  }

  private addLetterObject = () => {
    // Adds a new letter object to be displayed
    const letterObj = FallingObjectFactory.createObject();

    this.letterObjects.push(letterObj);

    this.queueLetterObject();
  };
}
