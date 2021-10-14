import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { GameEventType, gameObserver } from '../events/GameObserver';
import { keyboardObserver } from '../events/KeyboardObserver';
import { Letter, LetterHighlightState } from '../utils/LetterObjectFactory';
import { RandomUtils } from '../utils/RandomUtils';
import { FallingObjectState } from './FallingObjectState';

export class LetterObjectState extends FallingObjectState {
  public id: string;
  @observable public letters: Letter[];
  @observable public active = false;

  constructor(style: CSSProperties, letters: Letter[]) {
    super(style);

    this.id = RandomUtils.createId();

    this.letters = letters;

    keyboardObserver.addKeyListener(this.onKeyPress);
  }

  public onRemove() {
    keyboardObserver.removeKeyListener(this.onKeyPress);
  }

  @action private onKeyPress = (key: string) => {
    // Only care about keys a-z
    if (!/[a-zA-Z]/.test(key)) {
      return;
    }

    // If this key is same as first non-highlighted letter
    const nextLetter = this.letters.find(
      (letter) => letter.highlight === LetterHighlightState.NONE
    );
    if (!nextLetter) {
      return;
    }

    // If letter is a match
    if (nextLetter.char === key) {
      this.matchLetter(nextLetter);
    } else {
      // If there were existing highlighted letters, show warning
      if (this.letters.find((l) => l.highlight === LetterHighlightState.HIGHLIGHT)) {
        this.letters.forEach((letter) => (letter.highlight = LetterHighlightState.WARN));
        setTimeout(this.resetLetterHighlights, 500);
      }
    }
  };

  private matchLetter(letter: Letter) {
    // Highlight it
    letter.highlight = LetterHighlightState.HIGHLIGHT;

    // Send event for it
    gameObserver.fireEvent({ type: GameEventType.VALID_LETTER, letter });

    // Is this the last one to match?
    const toMatch = this.letters.filter(
      (letter) => letter.highlight !== LetterHighlightState.HIGHLIGHT
    );
    if (!toMatch.length) {
      // Letter object now active
      this.active = true;
      gameObserver.fireEvent({ type: GameEventType.COMPLETE_LETTER_OBJ, letters: this.letters });
    }
  }

  @action private resetLetterHighlights = () => {
    this.letters.forEach((letter) => (letter.highlight = LetterHighlightState.NONE));
  };
}
