import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";

const StoreNavItem = styled.section``;

const List = styled.ul`
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled(Button)`
  && {
    width: 280px;
    height: 100%;
    font-size: 15px;
    margin: -2px;
    border-top: 1px solid
      ${(props) => (props.current ? "RGB(38, 38, 38)" : "transparent")};
    border-left: 1px solid
      ${(props) => (props.current ? "RGB(38, 38, 38)" : "transparent")};
    border-right: 1px solid
      ${(props) => (props.current ? "RGB(38, 38, 38)" : "transparent")};
    border-bottom: 1px solid
      ${(props) => (props.current ? "transparent" : "RGB(38, 38, 38)")};
  }
`;

const SLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default withRouter(({ location: { pathname } }) => (
  <StoreNavItem>
    <List>
      <Item current={pathname === "/store"}>
        <SLink to="/store">새로운 상품</SLink>
      </Item>
      <Item current={pathname === "/store/ticket"}>
        <SLink to="/store/ticket">티켓</SLink>
      </Item>
      <Item current={pathname === "/store/popcorn"}>
        <SLink to="/store/popcorn">매점</SLink>
      </Item>
      <Item current={pathname === "/store/pointmall"}>
        <SLink to="/store/pointmall">포인트몰</SLink>
      </Item>
    </List>
  </StoreNavItem>
));
