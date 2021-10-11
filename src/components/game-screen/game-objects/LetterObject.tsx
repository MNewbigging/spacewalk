import { observer } from 'mobx-react';
import React from 'react';

import { LetterObjectState } from '../../../state/LetterObjectState';

import './letter-object.scss';

interface Props {
  letterObject: LetterObjectState;
}

@observer
export class LetterObject extends React.Component<Props> {
  public render() {
    const { letterObject } = this.props;

    const active = letterObject.active ? 'active' : '';

    return (
      <div className={'letter-object ' + active}>
        {letterObject.letters.map((letter, i) => (
          <div key={letterObject.id + '-' + i} className={'letter ' + letter.highlight}>
            {letter.char}
          </div>
        ))}
      </div>
    );
  }
}
