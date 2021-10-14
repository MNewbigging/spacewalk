export class AudioUtils {
  private static minuteMillis = 60000;

  public static get4Measure(bpm: number) {
    return Math.ceil(this.minuteMillis / bpm);
  }

  public static get8Measure(bpm: number) {
    return Math.ceil(this.get4Measure(bpm) / 2);
  }

  public static get8TMeasure(bpm: number) {
    return Math.ceil(this.get4Measure(bpm) / 3);
  }

  public static get16Measure(bpm: number) {
    return Math.ceil(this.get8Measure(bpm) / 2);
  }

  public static get32Measure(bpm: number) {
    return Math.ceil(this.get16Measure(bpm) / 2);
  }

  public static get64Measure(bpm: number) {
    return Math.ceil(this.get32Measure(bpm) / 2);
  }

  public static get128Measure(bpm: number) {
    return Math.ceil(this.get64Measure(bpm) / 2);
  }
}
