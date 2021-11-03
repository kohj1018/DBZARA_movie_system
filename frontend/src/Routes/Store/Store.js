import React from "react";
import styled from "styled-components";

const StoreContainer = styled.div`
  padding-top: 80px;
  height: 100vh;
  color: blue;
  display: grid;
  background-color: #ff7eb3;
`;
const StoreTitle = styled.h2`
  min-width: 1200px;
  height: 30px;
  margin-bottom: 26px;
  background-color: #764ba2;
`;
const StoreMain = styled.div`
  display: flex;
`;

const StoreNavList = styled.p`
  width: 280px;
`;

const StoreMainItem = styled.section`
  margin-top: 12px;
  height: 254;
`;

const Store = () => (
  <>
    <StoreContainer>
      <StoreTitle>스토어</StoreTitle>
      <StoreMain>
        {["새로운 상품", "티켓", "매점", "포인트몰"].map((i) => {
          return <StoreNavList>{i}</StoreNavList>;
        })}
        {/* <StoreNav /> */}
        <StoreMainItem></StoreMainItem>
      </StoreMain>
    </StoreContainer>
  </>
);

export default Store;
