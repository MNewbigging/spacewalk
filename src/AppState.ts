import { action, observable } from 'mobx';

export enum Screen {
  START = 'start',
  GAME = 'game',
}

export class AppState {
  @observable public screen = Screen.START;

  @action public startGame = () => {
    this.screen = Screen.GAME;
  };
}
