import { observer } from 'mobx-react';
import React from 'react';

import { GameState } from '../../state/GameState';
import { FallingObject } from './game-objects/FallingObject';
import { LetterObject } from './game-objects/LetterObject';

import './game-screen.scss';

interface Props {
  gameState: GameState;
}

@observer
export class GameScreen extends React.Component<Props> {
  public render() {
    const { gameState } = this.props;

    return (
      <div className={'game-screen'}>
        {gameState.letterObjects.map((obj) => (
          <FallingObject key={obj.id} fallingObject={obj}>
            <LetterObject letterObject={obj} />
          </FallingObject>
        ))}
      </div>
    );
  }
}
