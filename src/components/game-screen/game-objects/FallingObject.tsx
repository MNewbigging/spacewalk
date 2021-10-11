import React, { createRef } from 'react';

import './falling-object.scss';

interface Props {
  onEnter: () => void;
  onExit: () => void;
}

export class FallingObject extends React.Component<Props> {
  private observer: IntersectionObserver;
  private ref = createRef<HTMLDivElement>();

  componentDidMount() {
    const { onEnter, onExit } = this.props;

    const obsProps: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onEnter();
      } else {
        onExit();
      }
    }, obsProps);

    if (this.ref.current) {
      this.observer?.observe(this.ref.current);
    }
  }

  public render() {
    return (
      <div ref={this.ref} className={'falling-object'}>
        {this.props.children}
      </div>
    );
  }
}
