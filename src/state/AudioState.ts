import { Howl } from 'howler';
import { GameEvent, GameEventType, gameObserver } from '../events/GameObserver';
import { AudioUtils } from '../utils/AudioUtils';
import { AudioFileLoader } from '../utils/AudioFileLoader';
import { Letter } from '../utils/LetterObjectFactory';

export interface LetterPlaybackGroupInit {
  id: string;
  letters: string[];
  timestamps: number[];
}

export interface LetterPlaybackGroup {
  id: string;
  items: LetterPlaybackItem[];
  nextIdx: number;
}

export interface LetterPlaybackItem {
  letter: string;
  interval: number;
}

export class AudioState {
  private bpm = 120;
  private bar: number;
  private startTime = 0;
  private letterIntervalMap: Map<string, number>;
  private intervalQueueMap: Map<number, Set<string>>;
  private audioMap = new Map<string, Howl>();
  private playbackGroupMap = new Map<string, LetterPlaybackGroup>();

  constructor() {
    this.bar = AudioUtils.get1Bar(this.bpm);

    // Generate the interval values map for each character
    this.letterIntervalMap = AudioUtils.makeLetterIntervalMap(this.bpm);

    // Generate the queue map from the intervals we're using
    const intervals = Array.from(this.letterIntervalMap.values());
    this.intervalQueueMap = AudioUtils.makeIntervalQueueMap(intervals);

    // Load audio files
    new AudioFileLoader(this.audioMap);

    // gameObserver.addGameEventListener(this.onValidLetter, GameEventType.VALID_LETTER);
    gameObserver.addGameEventListener(
      this.onCompleteLetterGroup,
      GameEventType.COMPLETE_LETTER_OBJ
    );
    gameObserver.addGameEventListener(this.onGroupExit, GameEventType.LETTER_OBJ_EXIT);
  }

  public start() {
    this.audioMap.get('background-base').play();
    this.startTime = Date.now();
  }

  private onCompleteLetterGroup = (event: GameEvent) => {
    if (event.type !== GameEventType.COMPLETE_LETTER_OBJ) {
      return;
    }

    // Build the playback group
    const items: LetterPlaybackItem[] = [];

    const letters = event.letterPlaybackGroupInit.letters;
    const timestamps = event.letterPlaybackGroupInit.timestamps;

    for (let i = 0; i < letters.length; i++) {
      const curLetterTime = timestamps[i] - this.startTime;

      let nextInterval = 0;
      const nextIdx = i + 1;
      if (nextIdx === letters.length) {
        // Reached the end - determine interval between loops for the whole group
        // const totalTime = items.reduce((acc, cur) => acc + cur.interval, 0);
        // const barRemainder = totalTime % this.bar;
        // const barDiff = this.bar - barRemainder;
        nextInterval = this.bar; //+ barDiff;
      } else {
        // Determine interval between this and next letter
        const nextLetterTime = timestamps[nextIdx] - this.startTime;
        const timeDiff = nextLetterTime - curLetterTime;
        const nextLetterInterval = this.letterIntervalMap.get(letters[nextIdx]);
        const intervalCount = Math.round(timeDiff / nextLetterInterval);
        nextInterval = nextLetterInterval * intervalCount;
      }

      items.push({
        letter: letters[i],
        interval: nextInterval,
      });
    }

    const playbackGroup: LetterPlaybackGroup = {
      id: event.letterPlaybackGroupInit.id,
      items,
      nextIdx: 0,
    };
    this.playbackGroupMap.set(playbackGroup.id, playbackGroup);

    // Now work out when to start the group playback
    // Start at interval of first letter in group
    const now = Date.now();
    const diff = now - this.startTime;
    const interval = AudioUtils.get4Interval(this.bpm);
    const intervalRemainder = diff % interval;
    const startIn = interval - intervalRemainder;

    setTimeout(() => this.nextInPlaybackGroup(playbackGroup.id), startIn);
  };

  private nextInPlaybackGroup = (id: string) => {
    const group = this.playbackGroupMap.get(id);
    if (!group) {
      return;
    }

    const item = group.items[group.nextIdx];
    this.audioMap.get(item.letter).play();

    group.nextIdx++;
    if (group.nextIdx === group.items.length) {
      group.nextIdx = 0;
    }

    setTimeout(() => this.nextInPlaybackGroup(id), item.interval);
  };

  private onGroupExit = (event: GameEvent) => {
    if (event.type !== GameEventType.LETTER_OBJ_EXIT) {
      return;
    }

    this.playbackGroupMap.delete(event.id);
  };

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
}
