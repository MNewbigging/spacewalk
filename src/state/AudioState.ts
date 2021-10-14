import { AudioUtils } from '../utils/AudioUtils';

export enum Measure {
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
  private curBeat = 0;

  constructor() {
    const quarterMeasure = AudioUtils.get4Measure(this.bpm);
    // setInterval(this.quarterTick, quarterMeasure);
  }

  private quarterTick = () => {
    this.curBeat++;

    if (this.curBeat > this.bpm) {
      this.curBeat = 1;
    }

    console.log('beat: ', this.curBeat);
  };
}
