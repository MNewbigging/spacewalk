import { Howl } from 'howler';
import { GameEvent, GameEventType, gameObserver } from '../events/GameObserver';
import { AudioUtils } from '../utils/AudioUtils';
import { AudioFileLoader } from '../utils/AudioFileLoader';
import { Letter } from '../utils/LetterObjectFactory';

export interface LetterPlaybackGroupInit {
  id: string;
  letterTimeMap: Map<Letter, number>;
}

export interface LetterPlaybackGroup {
  id: string;
  items: LetterPlaybackItem[];
}

export interface LetterPlaybackItem {
  letter: string;
  interval: number;
}

export class AudioState {
  private bpm = 120;
  private startTime = 0;
  private letterIntervalMap: Map<string, number>;
  private intervalQueueMap: Map<number, Set<string>>;
  private audioMap = new Map<string, Howl>();

  constructor() {
    // Generate the interval values map for each character
    this.letterIntervalMap = AudioUtils.makeLetterIntervalMap(this.bpm);

    // Generate the queue map from the intervals we're using
    const intervals = Array.from(this.letterIntervalMap.values());
    this.intervalQueueMap = AudioUtils.makeIntervalQueueMap(intervals);

    // Load audio files
    new AudioFileLoader(this.audioMap);

    gameObserver.addGameEventListener(this.onValidLetter, GameEventType.VALID_LETTER);
    gameObserver.addGameEventListener(
      this.onCompleteLetterGroup,
      GameEventType.COMPLETE_LETTER_OBJ
    );
  }

  public start() {
    this.audioMap.get('background-base').play();
    this.startTime = Date.now();
  }

  private onValidLetter = (event: GameEvent) => {
    if (event.type !== GameEventType.VALID_LETTER) {
      return;
    }

    const interval = this.letterIntervalMap.get(event.letter.char);
    this.intervalQueueMap.get(interval).add(event.letter.char);

    // Do as little as possible after this point to keep calcs accurate
    const curTime = Date.now();
    const timeDiff = curTime - this.startTime;

    const intervalDiff = timeDiff % interval;

    const nextInterval = interval - intervalDiff;

    // - 1 removes a ms for the next event cycle
    setTimeout(() => this.onNextLetterInterval(interval), nextInterval - 1);
  };

  private onNextLetterInterval = (interval: number) => {
    // Get the letters to play sounds for this interval
    const letterSet = this.intervalQueueMap.get(interval);

    // Play all the sounds now
    letterSet.forEach((letter) => {
      // play the sound for this letter
      this.audioMap.get(letter).play();
    });

    // Then clear the set for this interval
    letterSet.clear();
    this.intervalQueueMap.set(interval, letterSet);
  };

  private onCompleteLetterGroup = (event: GameEvent) => {
    if (event.type !== GameEventType.COMPLETE_LETTER_OBJ) {
      return;
    }

    // Build the playback group
    event.letterTimes.forEach((time: number, letter: Letter) => {});
  };
}
