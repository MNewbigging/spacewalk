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
    const warn = letterObject.warn ? 'warn' : '';
    const classes = ['letter-object', active, warn];

    return (
      <div className={classes.join(' ')}>
        {letterObject.letters.map((letter, i) => (
          <div key={letterObject.id + '-' + i} className={'letter ' + letter.highlight}>
            {letter.char}
          </div>
        ))}
      </div>
    );
  }
}
