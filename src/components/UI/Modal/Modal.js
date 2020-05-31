import React, { Component } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.isVisible !== this.props.isVisible || nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <>
        <Backdrop isVisible={this.props.isVisible} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.isVisible ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.isVisible ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;
