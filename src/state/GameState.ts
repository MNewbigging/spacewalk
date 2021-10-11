import { action, observable } from 'mobx';
import { LetterObjectFactory } from '../utils/LetterObjectFactory';
import { RandomUtils } from '../utils/RandomUtils';
import { LetterObjectState } from './LetterObjectState';

export class GameState {
  @observable public letterObjects: LetterObjectState[] = [];

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
    const letterObj = LetterObjectFactory.createLetterObject();

    this.letterObjects.push(letterObj);

    this.removeLetterObjects();
    this.queueLetterObject();
  };

  @action private removeLetterObjects() {
    // Removes any letter objects that have moved off screen
    const oldLetters = this.letterObjects.filter((obj) => obj.hasExitedScreen());
    oldLetters.forEach((letter) => letter.onRemove());

    this.letterObjects = this.letterObjects.filter((obj) => !obj.hasExitedScreen());
  }
}
