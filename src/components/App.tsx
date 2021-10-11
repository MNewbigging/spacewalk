import { observer } from 'mobx-react';
import React from 'react';

import { AppState, Screen } from '../state/AppState';
import { StartScreen } from './start-screen/StartScreen';
import { GameScreen } from './game-screen/GameScreen';

import './app.scss';

@observer
export class App extends React.PureComponent {
  private readonly appState = new AppState();
  public render() {
    if (this.appState.screen === Screen.GAME && this.appState.gameState) {
      return <GameScreen gameState={this.appState.gameState} />;
    }

    return <StartScreen startGame={this.appState.startGame} />;
  }
}
