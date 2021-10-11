import React from 'react';
import { GameState } from '../../state/GameState';

import './game-screen.scss';

interface Props {
  gameState: GameState;
}

export class GameScreen extends React.Component<Props> {
  public render() {
    return <div className={'game-screen'}></div>;
  }
}
