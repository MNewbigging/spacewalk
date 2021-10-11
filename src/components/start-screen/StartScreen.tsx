import React from 'react';

import './start-screen.scss';

interface Props {
  startGame: () => void;
}

export class StartScreen extends React.Component<Props> {
  public render() {
    const { startGame } = this.props;

    return (
      <div className={'start-screen'}>
        <button onClick={startGame}>Start</button>
      </div>
    );
  }
}
