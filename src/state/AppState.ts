import { action, observable } from 'mobx';
import { GameEvent, GameEventType, gameObserver } from '../events/GameObserver';
import { AudioState } from './AudioState';
import { GameState } from './GameState';

export enum Screen {
  START = 'start',
  GAME = 'game',
}

export class AppState {
  @observable public screen = Screen.START;
  @observable public loading = true;
  public gameState?: GameState;
  private audioState = new AudioState();

  constructor() {
    gameObserver.addGameEventListener(this.onAudioLoaded, GameEventType.AUDIO_LOADED);
  }

  @action public startGame = () => {
    this.gameState = new GameState();

    this.screen = Screen.GAME;
  };

  @action private onAudioLoaded = () => {
    console.log('audio loaded appstate');
    this.loading = false;
  };
}
