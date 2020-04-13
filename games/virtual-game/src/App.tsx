import React from 'react';
import './App.css';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import * as ROUTES from './constants/routes';

import Create from './containers/create/Create';
import Game from './containers/game/Game';
import Home from './containers/home/Home';

function Main() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={ROUTES.LANDING} component={Create} />

          <Route exact path={ROUTES.CREATE} component={Create} />

          {/* <Route exact path={ROUTES.GAMEWITHROLE} component={Game} /> */}
          
          <Route exact path={ROUTES.GAME} component={Game} />
          {/* <Route component={Error} /> */}
        </Switch>
      </div>
    </BrowserRouter>);
}

export default Main;

