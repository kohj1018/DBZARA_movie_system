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
import Reservation from "Routes/Reservation";
import Theater from "Routes/Theater";
import Event from "Routes/Event";

import Store from "Routes/Store/Store";
// import StoreTicket from "Routes/Store/Ticket";
// import StorePopcorn from "Routes/Store/Popcorn";
// import StorePointMall from "Routes/Store/Pointmall";

import Login from "Routes/Login";
import Join from "Routes/Join";

// TODO route를 부모prop받아와서 component화 시키기

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/movies" component={Movies} />
      <Route path="/reservation" component={Reservation} />
      <Route path="/theater" component={Theater} />
      <Route path="/event" component={Event} />
      <Route path="/store" component={Store} />
      {/* <Route path="/store/ticket" component={StoreTicket} />
      <Route path="/store/popcorn" component={StorePopcorn} />
      <Route path="/store/pointmall" component={StorePointMall} /> */}
      <Route path="/login" exact component={Login} />
      <Route path="/join" exact component={Join} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);
