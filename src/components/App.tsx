import { observer } from 'mobx-react';
import React from 'react';

import { AppState, Screen } from '../state/AppState';
import { StartScreen } from './start-screen/StartScreen';
import { GameScreen } from './game-screen/GameScreen';

import './app.scss';
import './game-screen/game-background.scss';

@observer
export class App extends React.PureComponent {
  private readonly appState = new AppState();
  public render() {
    let screen: JSX.Element = undefined;

    if (this.appState.screen === Screen.GAME && this.appState.gameState) {
      screen = <GameScreen gameState={this.appState.gameState} />;
    } else {
      screen = <StartScreen loading={this.appState.loading} startGame={this.appState.startGame} />;
    }

    return (
      <>
        <div className={'background'}>
          <div className={'stars-small'}></div>
          <div className={'stars-small red'}></div>
          <div className={'stars-small blue'}></div>
          <div className={'stars-med'}></div>
          <div className={'stars-med red'}></div>
          <div className={'stars-med blue'}></div>
          <div className={'stars-large'}></div>
          <div className={'stars-large red'}></div>
          <div className={'stars-large blue'}></div>
          {screen}
        </div>
      </>
    );
  }
}
