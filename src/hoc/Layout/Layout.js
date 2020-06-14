import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  const [isSideDrawerVisible, setIsSideDrawerVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setIsSideDrawerVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setIsSideDrawerVisible(!isSideDrawerVisible);
  };

  return (
    <>
      <Toolbar isAuth={props.isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={isSideDrawerVisible}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
