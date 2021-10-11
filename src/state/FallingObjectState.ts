import { CSSProperties } from 'react';
import { RandomUtils } from '../utils/RandomUtils';

export class FallingObjectState {
  public id: string;
  public onScreen = false;
  public style: CSSProperties;

  constructor(style: CSSProperties) {
    this.id = RandomUtils.createId();
    this.style = style;
  }

  public enterScreen = () => {
    this.onScreen = true;
  };

  public exitScreen = () => {
    this.onScreen = false;
  };
}
