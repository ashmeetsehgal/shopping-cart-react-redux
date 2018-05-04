import React from 'react';
import { Route, browserHistory, Redirect } from 'react-router';
import ListingPage from './Containers/ListingPage';
import Checkout from './Containers/CheckoutPage';

export default (
  <Route history={browserHistory}>
    <Route path='/home' component={ListingPage} />
    <Route path='/checkout' component={Checkout} />
    <Redirect path='*' to='/home' />
  </Route>
);
