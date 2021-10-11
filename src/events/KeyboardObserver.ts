type KeyListener = (key: string) => void;

class KeyboardObserver {
  private pressedKeys = new Set<string>();
  private keyListeners: KeyListener[] = [];

  constructor() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  public addKeyListener(listener: KeyListener) {
    this.keyListeners.push(listener);
  }

  public removeKeyListener(listener: KeyListener) {
    this.keyListeners = this.keyListeners.filter((kl) => kl !== listener);
  }

  private readonly onKeyDown = (e: KeyboardEvent) => {
    // Ensures listeners are only called once
    if (this.pressedKeys.has(e.key)) {
      return;
    }

    this.pressedKeys.add(e.key);
    this.keyListeners.forEach((kl) => kl(e.key));
  };

  private readonly onKeyUp = (e: KeyboardEvent) => {
    this.pressedKeys.delete(e.key);
  };
}

export const keyboardObserver = new KeyboardObserver();
