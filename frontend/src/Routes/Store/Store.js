import React from "react";
import styled from "styled-components";
import StoreNav from "Components/StoreNav";
import { HashRouter as Router } from "react-router-dom";

// TODO 라우터 공부 + 안에만 바뀌는지 확인

const StoreContainer = styled.div`
  padding-top: 80px;
  height: 100vh;
  color: blue;
  display: flex;
  flex-direction: column;
  background-color: #a30d0d;
`;
const StoreTitle = styled.div`
  min-width: 1200px;
  height: 30px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 26px;
  display: flex;
  background-color: #764ba2;
`;
const StoreMain = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 1200px;
`;

const StoreMainItem = styled.section`
  margin-top: 12px;
  height: 254;
`;

const Store = () => (
  <>
    <StoreContainer>
      <StoreTitle>
        <p>스토어</p>
      </StoreTitle>
      <StoreMain>
        <Router>
          <StoreNav />
        </Router>
        <StoreMainItem></StoreMainItem>
      </StoreMain>
    </StoreContainer>
  </>
);

export default Store;
