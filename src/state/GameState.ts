import { action, observable } from 'mobx';
import { LetterObjectFactory } from '../utils/LetterObjectFactory';
import { RandomUtils } from '../utils/RandomUtils';
import { GameStageState } from './GameStageState';
import { LetterObjectState } from './LetterObjectState';

export class GameState {
  @observable public letterObjects: LetterObjectState[] = [];
  private gameStageState = new GameStageState();
  private paused = false;

  constructor() {
    // Start the first letter now
    this.addLetterObject();

    window.addEventListener('blur', this.onBlurWindow);
    window.addEventListener('focus', this.onFocusWindow);
  }

  private queueLetterObject() {
    // Set timeout for next letter object to be added based on game stage
    const spawnDelay = this.gameStageState.getCurrentStage().spawnDelay;

    setTimeout(this.addLetterObject, spawnDelay);
  }

  private addLetterObject = () => {
    if (this.paused) {
      return;
    }

    // Adds a new letter object to be displayed
    const letterObj = LetterObjectFactory.createLetterObject(this.gameStageState.getCurrentStage());

    this.letterObjects.push(letterObj);

    this.gameStageState.countSpawn();
    this.removeLetterObjects();
    this.queueLetterObject();
  };

  @action private removeLetterObjects() {
    // Removes any letter objects that have moved off screen
    const oldLetters = this.letterObjects.filter((obj) => obj.hasExitedScreen());
    oldLetters.forEach((letter) => letter.onRemove());

    this.letterObjects = this.letterObjects.filter((obj) => !obj.hasExitedScreen());
  }

  private onBlurWindow = () => {
    this.paused = true;
  };

  private onFocusWindow = () => {
    this.paused = false;
  };
}
