import React from 'react';
import ReactDOM from 'react-dom';

import { AppRouter, history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import { firebase } from './firebase/firebase';

import './firebase/firebase';
import 'react-dates/initialize';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();
const appNode = document.getElementById('app');
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(<AppRouter store={store}/>, appNode);
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, appNode);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses())
      .then(() => {
        renderApp();
        if (history.location.pathname === '/') {
          history.push('/expenses');
        }
      })
      .catch((e) => {
        ReactDOM.render(<p>Could not load expenses</p>, appNode);
      });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
