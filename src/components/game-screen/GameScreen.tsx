import React from 'react';
import { GameState } from '../../state/GameState';
import { FallingObject } from './game-objects/FallingObject';

import './game-screen.scss';

interface Props {
  gameState: GameState;
}

export class GameScreen extends React.Component<Props> {
  public render() {
    const { gameState } = this.props;

    return (
      <div className={'game-screen'}>
        <FallingObject onEnter={gameState.onEnter} onExit={gameState.onExit}>
          <div className={'test'}>TEST</div>
        </FallingObject>
      </div>
    );
  }
}
