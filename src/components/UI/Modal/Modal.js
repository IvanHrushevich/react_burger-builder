import React from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux1';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => (
  <Aux>
    <Backdrop isVisible={props.isVisible} clicked={props.modalClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: props.isVisible ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.isVisible ? '1' : '0'
      }}
    >
      {props.children}
    </div>
  </Aux>
);

export default modal;
