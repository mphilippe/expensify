import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/expenses" activeClassName="is-active" exact={true}>Go gome</NavLink> - 
    <NavLink to="/create" activeClassName="is-active">New expense</NavLink> - 
    <NavLink to="/help" activeClassName="is-active">Help</NavLink> 
    <button onClick={startLogout}>Logout</button>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
