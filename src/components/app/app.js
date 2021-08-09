import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage, CartPage } from '../pages';

import './app.css';
const App = () => {
  return (
    <main >
      <Switch>
        <Route
          path="/"
          component={HomePage}
          exact />
        <Route
          path="/cart"
          component={CartPage}
          />
      </Switch>
    </main>
  );
};

export default App;