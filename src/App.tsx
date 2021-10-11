import { observer } from 'mobx-react';
import React from 'react';
import { AppState } from './AppState';
import { StartScreen } from './components/start-screen/StartScreen';

@observer
export class App extends React.PureComponent {
  private readonly appState = new AppState();
  public render() {
    return <StartScreen startGame={this.appState.startGame} />;
  }
}
