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
        <button className={'start-button'} onClick={startGame} disabled={loading}>
          {loading ? <span>Loading</span> : <span>Start</span>}
        </button>
      </div>
    );
  }
}
