import React from "react";
import GlobalStyles from "Components/GlobalStyles";
import UserInfo from "context";
import Footer from "Components/Footer";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Header from "Components/Header";
import routeURL from "Routes/RouteURL";

function App() {
  return (
    // UserContext 정보가 사용되는 곳을 감쌈
    <>
      <GlobalStyles />
      <UserInfo>
        <Router>
          <Header />
          <Switch>
            {routeURL.map((route) => (
              <Route path={route.path} exact component={route.component} />
            ))}
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </UserInfo>
      <Footer />
    </>
  );
}

export default App;
