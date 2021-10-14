import { Howl } from 'howler';
import { GameEvent, GameEventType, gameObserver } from '../events/GameObserver';
import { AudioUtils } from '../utils/AudioUtils';

import '../assets/background-base.wav';

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
  private intervalQueueMap = new Map<number, Set<string>>();
  private audioMap = new Map<string, Howl>();

  constructor() {
    // Generate the interval values map for each character
    this.letterIntervalMap = AudioUtils.makeLetterIntervalMap(this.bpm);

    // Load audio files
    this.loadAudioFiles();

    gameObserver.addGameEventListener(this.onValidLetter, GameEventType.VALID_LETTER);
  }

  private loadAudioFiles() {
    const onLoadError = (id: string) => console.log('error loading audio file ' + id);

    // Background audio
    const bgBaseId = 'background-base';
    const bgBase = new Howl({
      src: ['../assets/background-base.wav'],
      onloaderror: () => onLoadError(bgBaseId),
      onload: this.onLoadAudioFile,
      preload: false,
    });
    this.audioMap.set(bgBaseId, bgBase);

    // Now load everything in the map
    Array.from(this.audioMap.values()).forEach((howl) => howl.load());
  }

  private onLoadAudioFile = () => {
    // filter down by loading files
    const audio: Howl[] = Array.from(this.audioMap.values());
    const loading = audio.filter((howl) => howl.state() === 'loading');

    // If nothing in loading, we're done loading
    if (!loading.length) {
      gameObserver.fireEvent({ type: GameEventType.AUDIO_LOADED });
    }
  };

  private start() {
    //this.backgroundBase.play();
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
    setTimeout(() => this.onNextInterval(interval), nextInterval - 1);
  };

  private onNextInterval = (interval: number) => {
    // Get the letters to play sounds for this interval
    const letterSet = this.intervalQueueMap.get(interval);

    // Play all the sounds now
    letterSet.forEach((letter) => {
      // play the sound for this letter
    });

    // Then clear the set for this interval
    letterSet.clear();
    this.intervalQueueMap.set(interval, letterSet);
  };
}
