import React from 'react';

import classes from './Modal.module.css';

const modal = props => (
  <div
    className={classes.Modal}
    style={{
      transform: props.isVisible ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: props.isVisible ? '1' : '0'
    }}
  >
    {props.children}
  </div>
);

export default modal;
