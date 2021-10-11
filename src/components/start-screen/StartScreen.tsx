import React from 'react';

import './start-screen.scss';

interface Props {
  startGame: () => void;
}

export class StartScreen extends React.Component<Props> {
  public render() {
    return (
      <div className={'start-screen'}>
        <button>Start</button>
      </div>
    );
  }
}
