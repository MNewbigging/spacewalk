import { observer } from 'mobx-react';
import React from 'react';

import { GameState } from '../../state/GameState';
import { FallingObject } from './game-objects/FallingObject';
import { LetterObject } from './game-objects/LetterObject';

import './game-screen.scss';
import './game-background.scss';

interface Props {
  gameState: GameState;
}

@observer
export class GameScreen extends React.Component<Props> {
  public render() {
    const { gameState } = this.props;

    return (
      <div className={'game-screen'}>
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
        </div>
        {gameState.letterObjects.map((obj) => (
          <FallingObject key={obj.id} fallingObject={obj}>
            <LetterObject letterObject={obj} />
          </FallingObject>
        ))}
      </div>
    );
  }
}
