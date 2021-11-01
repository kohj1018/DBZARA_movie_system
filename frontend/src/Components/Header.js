import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";

const Header = styled.header`
  z-index: 10;
  background-color: RGB(213, 163, 255);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled(Button)`
  && {
    width: 100px;
    height: 50px;
    font-size: 20px;
    margin: 2px 10px;
    border-bottom: 5px solid
      ${(props) => (props.current ? "RGB(22, 31, 46)" : "transparent")};
  }
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <List>
      <Item current={pathname === "/"}>
        <SLink to="/">Home</SLink>
      </Item>
      <Item current={pathname === "/movies"}>
        <SLink to="/movies">Movies</SLink>
      </Item>
      <Item current={pathname === "/theater"}>
        <SLink to="/theater">Theater</SLink>
      </Item>
      <Item current={pathname === "/material"}>
        <SLink to="/material">Material</SLink>
      </Item>
    </List>
    <List>
      <Item current={pathname === "/join"}>
        <SLink to="/join">회원가입</SLink>
      </Item>
      <Item current={pathname === "/login"}>
        <SLink to="/login">로그인</SLink>
      </Item>
    </List>
  </Header>
));
