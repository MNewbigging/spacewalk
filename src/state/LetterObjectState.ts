import { observable } from 'mobx';
import { CSSProperties } from 'react';
import { keyboardObserver } from '../events/KeyboardObserver';
import { RandomUtils } from '../utils/RandomUtils';
import { FallingObjectState } from './FallingObjectState';

export enum LetterHighlightState {
  NONE = 'none',
  HIGHLIGHT = 'highlight',
  WARN = 'warn',
}

export interface Letter {
  char: string;
  highlight: LetterHighlightState;
}

export class LetterObjectState extends FallingObjectState {
  public id: string;
  @observable public letters: Letter[];

  constructor(style: CSSProperties, letters: string) {
    super(style);

    this.id = RandomUtils.createId();

    this.letters = letters
      .split('')
      .map((char) => ({ char, highlight: LetterHighlightState.NONE }));

    keyboardObserver.addKeyListener(this.onKeyPress);
  }

  public onRemove() {
    keyboardObserver.removeKeyListener(this.onKeyPress);
  }

  private onKeyPress = (key: string) => {
    // Only care about keys a-z
    console.log('testing key press for key: ', key);

    if (!key.search(/[a-zA-Z]/)) {
      console.log('alphabetical');
    } else {
      console.log('not of this alphabet');
    }
  };
}
