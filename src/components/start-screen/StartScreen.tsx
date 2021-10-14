import React from 'react';

import './start-screen.scss';

interface Props {
  loading: boolean;
  startGame: () => void;
}

export class StartScreen extends React.Component<Props> {
  public render() {
    const { loading, startGame } = this.props;

    return (
      <div className={'start-screen'}>
        <button onClick={startGame} disabled={loading}>
          Start
        </button>
      </div>
    );
  }
}
