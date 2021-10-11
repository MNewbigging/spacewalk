export enum GameEvent {
  COMPLETE_LETTER_OBJ = 'complete-letter-obj',
}

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
