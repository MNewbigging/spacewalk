import { observer } from 'mobx-react';
import React from 'react';

import './start-screen.scss';

interface Props {
  loading: boolean;
  startGame: () => void;
}

@observer
export class StartScreen extends React.Component<Props> {
  public render() {
    const { loading, startGame } = this.props;

    return (
      <div className={'start-screen'}>
        <h1>Text fall</h1>
        <div className={'how-to-play'}>
          Letters will fall from the top of the screen in boxes. Each letter makes a certain sound.
          As you type all of the letters in a box it will activate and the sounds will play while on
          screen, in the rhythm you typed them in.
        </div>
        <button className={'start-button'} onClick={startGame} disabled={loading}>
          {loading ? <span>Loading</span> : <span>Start</span>}
        </button>
      </div>
    );
  }
}
