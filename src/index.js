/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './Store/store';
import routes from './routes';

const history = hashHistory;

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  ), document.getElementById('root'),
);
