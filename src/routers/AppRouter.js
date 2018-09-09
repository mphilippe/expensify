import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';

import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createBrowserHistory();

export const AppRouter = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute path="/" component={LoginPage} exact={true} />
          <PrivateRoute path="/expenses" component={ExpenseDashboardPage} />
          <PrivateRoute path="/create" component={AddExpensePage} />
          <PrivateRoute path="/edit/:id" component={EditExpensePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default AppRouter;
