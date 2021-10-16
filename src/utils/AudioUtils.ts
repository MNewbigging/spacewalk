import { LetterPlaybackGroupInit, LetterPlaybackItem } from '../state/AudioState';

export class AudioUtils {
  private static minuteMillis = 60000;

  public static get1Bar(bpm: number) {
    return Math.ceil(this.get4Interval(bpm) * 4);
  }

  public static get4Interval(bpm: number) {
    return Math.ceil(this.minuteMillis / bpm);
  }

  public static get8Interval(bpm: number) {
    return Math.ceil(this.get4Interval(bpm) / 2);
  }

  public static get8TInterval(bpm: number) {
    return Math.ceil(this.get4Interval(bpm) / 3);
  }

  public static get16Interval(bpm: number) {
    return Math.ceil(this.get8Interval(bpm) / 2);
  }

  public static get32Interval(bpm: number) {
    return Math.ceil(this.get16Interval(bpm) / 2);
  }

  public static get64Interval(bpm: number) {
    return Math.ceil(this.get32Interval(bpm) / 2);
  }

  public static get128Interval(bpm: number) {
    return Math.ceil(this.get64Interval(bpm) / 2);
  }

  public static makeLetterIntervalMap(bpm: number) {
    const intervalMap = new Map<string, number>();

    const fourthLetters = 'mnwv'.split('');
    const fourthInterval = this.get4Interval(bpm);
    fourthLetters.forEach((char) => intervalMap.set(char, fourthInterval));

    const eighthLetters = 'hjsfp'.split('');
    const eitghthInterval = this.get8Interval(bpm);
    eighthLetters.forEach((char) => intervalMap.set(char, eitghthInterval));

    const sixteenthLetters = 'yaeioubcdgkqrtlxz'.split('');
    const sixteenthInterval = this.get16Interval(bpm);
    sixteenthLetters.forEach((char) => intervalMap.set(char, sixteenthInterval));

    return intervalMap;
  }

  public static makeIntervalQueueMap(intervals: number[]) {
    // Initialises the sets within the queue map for the intervals we use
    const intervalQueueMap = new Map<number, Set<string>>();

    const uniqueIntervals = new Set<number>(intervals);
    uniqueIntervals.forEach((interval) => intervalQueueMap.set(interval, new Set<string>()));

    return intervalQueueMap;
  }
}
