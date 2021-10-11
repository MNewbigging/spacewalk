import { observer } from 'mobx-react';
import React from 'react';

import './letter-object.scss';

@observer
export class LetterObject extends React.Component {
  public render() {
    return <div className={'letter-object'}></div>;
  }
}
