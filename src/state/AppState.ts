import { action, observable } from 'mobx';
import { GameState } from './GameState';

export enum Screen {
  START = 'start',
  GAME = 'game',
}

export class AppState {
  @observable public screen = Screen.START;
  public gameState?: GameState;

  @action public startGame = () => {
    this.gameState = new GameState();

    this.screen = Screen.GAME;
  };
}
