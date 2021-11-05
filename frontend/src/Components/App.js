import React from "react";
import GlobalStyles from "Components/GlobalStyles";
import Router from "Components/Router";
import UserInfo from "context";
import Footer from "Components/Footer";

function App() {
  return (
    // UserContext 정보가 사용되는 곳을 감쌈
    <>
      <GlobalStyles />
      <UserInfo>
        <Router />
      </UserInfo>
      <Footer />
    </>
  );
}

export default App;
