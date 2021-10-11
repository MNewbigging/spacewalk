import { action, observable } from 'mobx';
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
    if (!/[a-zA-Z]/.test(key)) {
      return;
    }

    // If this key is same as first non-highlighted letter
    const nextLetter = this.letters.find(
      (letter) => letter.highlight === LetterHighlightState.NONE
    );
    if (!nextLetter) {
      // Already all highlighted; do nothing (should have removed listener by now)
      return;
    }

    // Highlight the letter if it's a match
    if (nextLetter.char === key) {
      nextLetter.highlight = LetterHighlightState.HIGHLIGHT;
    } else {
      // Otherwise, if there were existing highlighted letters, show warning
      if (this.letters.find((l) => l.highlight === LetterHighlightState.HIGHLIGHT)) {
        this.letters.forEach((letter) => (letter.highlight = LetterHighlightState.WARN));
        setTimeout(this.resetLetterHighlights, 500);
      }
    }
  };

  @action private resetLetterHighlights = () => {
    this.letters.forEach((letter) => (letter.highlight = LetterHighlightState.NONE));
  };
}
