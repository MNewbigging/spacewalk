import { action, observable } from 'mobx';
import { GameEventType, gameObserver } from '../events/GameObserver';
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
    if (this.loading) {
      return;
    }

    this.gameState = new GameState();
    this.audioState.start();
    this.screen = Screen.GAME;
  };

  @action private onAudioLoaded = () => {
    this.loading = false;
  };
}
