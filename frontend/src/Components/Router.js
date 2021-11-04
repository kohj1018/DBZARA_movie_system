import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Header from "Components/Header";
import routeURL from "Routes/RouteURL";

// TODO route를 부모prop받아와서 component화 시키기

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Router>
    <Header />
    <Switch>
      {routeURL.map((route) => (
        <Route path={route.path} exact component={route.component} />
      ))}
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);
