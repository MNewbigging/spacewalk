import { LetterObjectState } from '../state/LetterObjectState';

export enum GameEventType {
  COMPLETE_LETTER_OBJ = 'complete-letter-obj',
}

export type GameEvent = { event: GameEventType.COMPLETE_LETTER_OBJ; letterObj: LetterObjectState };

type GameEventListener = (event: GameEvent) => void;

class GameObserver {
  private listeners: GameEventListener[] = [];

  public addGameEventListener(listener: GameEventListener) {
    this.listeners.push(listener);
  }

  public removeGameEventListener(listener: GameEventListener) {
    this.listeners = this.listeners.filter((l) => l != listener);
  }

  public fireEvent(event: GameEvent) {
    this.listeners.forEach((l) => l(event));
  }
}

export const gameObserver = new GameObserver();
