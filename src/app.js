import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import './firebase/firebase';
import 'react-dates/initialize';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();
const appNode = document.getElementById('app');

ReactDOM.render(<p>Loading...</p>, appNode);

store.dispatch(startSetExpenses())
  .then(() => {
    ReactDOM.render(<AppRouter store={store}/>, appNode);
  })
  .catch((e) => {
    ReactDOM.render(<p>Could not load expenses</p>, appNode);
  });
