import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Header from "Components/Header";
import Home from "Routes/Home";
import Movies from "Routes/Movies";
import Theater from "Routes/Theater";
import Material from "Routes/Material";
import Login from "Routes/Login";
import Join from "Routes/Join";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/join" exact component={Join} />
        <Route path="/" exact component={Home} />
        <Route path="/theater" component={Theater} />
        <Route path="/movies" component={Movies} />
        <Route path="/material" component={Material} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
