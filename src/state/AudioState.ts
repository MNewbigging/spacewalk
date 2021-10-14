import { GameEvent, GameEventType, gameObserver } from '../events/GameObserver';
import { AudioUtils } from '../utils/AudioUtils';

export enum Interval {
  FOUR,
  EIGHT,
  EIGHT_T,
  SIXTEEN,
  THIRTY_TWO,
  SIXTY_FOUR,
  ONE_TWO_EIGHT,
}

export class AudioState {
  private bpm = 120;
  private startTime = 0;
  private letterIntervalMap: Map<string, number>;
  private fourthSfx = new Set<string>();

  constructor() {
    // Generate the interval values map for each character
    this.letterIntervalMap = AudioUtils.makeLetterIntervalMap(this.bpm);

    this.startTime = Date.now();

    gameObserver.addGameEventListener(this.onValidLetter, GameEventType.VALID_LETTER);
  }

  private start() {
    this.startTime = Date.now();
  }

  private onValidLetter = (event: GameEvent) => {
    console.log('audio valid letter, ', event);
    if (event.type !== GameEventType.VALID_LETTER) {
      return;
    }

    /**
     * Get timeout for when to play this letter sound:
     *
     * now - start time = diff
     * diff % interval  = remainder
     * interval - remainder = timeout
     */

    const curTime = Date.now();
    const timeDiff = curTime - this.startTime;

    const interval = this.letterIntervalMap.get(event.letter.char);

    const intervalDiff = timeDiff % interval;

    const nextInterval = interval - intervalDiff;

    // - 1 removes a ms for the next event cycle
    setTimeout(() => this.onNextInterval(interval), nextInterval - 1);
  };

  private onNextInterval = (int: number) => {
    const curTime = Date.now();
    const timeDiff = curTime - this.startTime;
    console.log('timeDiff: ', timeDiff);

    const intervalDiff = timeDiff % int;
    console.log('int mod', intervalDiff);
  };
}
