import { CSSProperties } from 'react';
import { keyboardObserver } from '../events/KeyboardObserver';
import { FallingObjectState } from './FallingObjectState';

export class LetterObjectState extends FallingObjectState {
  public letters: string;

  constructor(style: CSSProperties, letters: string) {
    super(style);

    this.letters = letters;

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
