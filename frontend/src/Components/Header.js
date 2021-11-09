import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";

/*
TODO
header
  hover -> 창 내려오고 list보이기
  메뉴 클릭 -> 사이드바
  서치 클릭 -> 사이드바
*/
const Header = styled.header`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.current ? "RGB(38, 38, 38)" : "transparent"};
`;

const List = styled.ul`
  display: flex;
`;

const Logo = styled.div`
  width: 100px;
  font-size: 30px;
  margin: 0 10px;
`;

const Item = styled(Button)`
  && {
    font-size: 18px;
    padding: 0px;
    margin: 0 10px;
  }
`;

const SLink = styled(Link)`
  && {
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default withRouter(({ location: { pathname } }) => (
  <Header current={pathname !== "/"}>
    <List>
      <Logo>
        <SLink to="/">Logo</SLink>
      </Logo>
    </List>
    <List>
      <Item current={pathname === "/Movies"}>
        <SLink to="/Movies">영화</SLink>
      </Item>
      <Item current={pathname === "/Reservation"}>
        <SLink to="/Reservation">예매</SLink>
      </Item>
      <Item current={pathname === "/Theater"}>
        <SLink to="/Theater">극장</SLink>
      </Item>
      <Item current={pathname === "/Event"}>
        <SLink to="/Event">이벤트</SLink>
      </Item>
      <Item current={pathname === "/Store"}>
        <SLink to="/Store">스토어</SLink>
      </Item>
    </List>
    <List>
      <Item current={pathname === "/Join"}>
        <SLink to="/Join">회원가입</SLink>
      </Item>
      <Item current={pathname === "/Login"}>
        <SLink to="/Login">로그인</SLink>
      </Item>
    </List>
  </Header>
));
