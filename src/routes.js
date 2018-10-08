import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Views/Home/Home";
import Profile from "./Views/Profile/Profile";
import Watchlist from "./Views/Watchlist/Watchlist";

export default (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/profile'  component={Profile} />
    <Route path='/watchlist'  component={Watchlist} />
    {/* <Route path= */}
    <Route path ='*' render={() => <h4>404 Not Found!</h4>} />
  </Switch>
);