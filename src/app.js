import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import 'react-dates/initialize';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

store.dispatch(addExpense({
  description: 'Rent',
  amount: 1260000,
  createdAt: 1000
}));
store.dispatch(addExpense({
  description: 'Grocery',
  amount: 300000,
  createdAt: -1000
}));
store.dispatch(addExpense({
  description: 'Coffee',
  amount: 10000,
  createdAt: 10000
}));

ReactDOM.render(<AppRouter store={store}/>, document.getElementById('app'));
