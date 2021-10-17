import React, { createRef } from 'react';

import { FallingObjectState } from '../../../state/FallingObjectState';

import './falling-object.scss';

interface Props {
  fallingObject: FallingObjectState;
}

export class FallingObject extends React.Component<Props> {
  private observer: IntersectionObserver;
  private ref = createRef<HTMLDivElement>();

  componentDidMount() {
    const { fallingObject } = this.props;

    const obsProps: IntersectionObserverInit = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fallingObject.enterScreen();
      } else {
        fallingObject.exitScreen();
      }
    }, obsProps);

    if (this.ref.current) {
      this.observer?.observe(this.ref.current);
    }

    window.addEventListener('blur', this.onBlurWindow);
    window.addEventListener('focus', this.onFocusWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('blur', this.onBlurWindow);
    window.removeEventListener('focus', this.onFocusWindow);
  }

  public render() {
    const { fallingObject } = this.props;

    return (
      <div ref={this.ref} className={'falling-object'} style={fallingObject.style}>
        {this.props.children}
      </div>
    );
  }

  private onBlurWindow = () => {
    if (this.ref.current) {
      this.ref.current.style.animationPlayState = 'paused';
    }
  };

  private onFocusWindow = () => {
    if (this.ref.current) {
      this.ref.current.style.animationPlayState = 'running';
    }
  };
}
