import React, { Component } from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux1';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.isVisible;
  }

  render() {
    return (
      <Aux>
        <Backdrop
          isVisible={this.props.isVisible}
          clicked={this.props.modalClosed}
        />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.isVisible
              ? 'translateY(0)'
              : 'translateY(-100vh)',
            opacity: this.props.isVisible ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
