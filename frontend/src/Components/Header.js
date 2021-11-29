import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

// TODO 메뉴, 서치 클릭 -> 사이드바

const Header = styled.header`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1200px;
  height: 70px;
  display: flex;
  align-items: flex-start;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.current
      ? "RGB(38, 38, 38)"
      : props.scrollY
      ? "RGB(38, 38, 38)"
      : "transparent"};
`;

const Logo = styled.div`
  width: 100px;
  font-size: 30px;
  margin: 0 10px;
`;

const Item = styled.div`
  font-size: 18px;
  padding: 0 0 0 20px;
  display: flex;
  width: 110px;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const LoginItem = styled(Item)`
  width: 100px;
  align-items: center;
`;

const SubListBg = styled.div`
  width: 100vw;
  height: 230px;
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.85;
  z-index: -1;
  display: ${(props) => (props.hover ? "block" : "none")};
`;

const SLink = styled(Link)`
  margin-bottom: 20px;
`;

const LinkText = styled.p`
  font: 20px;
  padding: 5px 0;
  &:hover {
    border-bottom: 1px solid red;
  }
`;

const List = styled.ul`
  display: flex;
  margin-top: 20px;
  justify-content: flex-start;
  align-items: flex-start;
`;

const TabUl = styled.ul`
  display: absolute;
  flex-direction: column;
  margin-right: 10px;
`;

const TabLi = styled(Link)`
  font-size: 15px;
  margin-bottom: 10px;
  display: ${(props) => (props.hover ? "block" : "none")};
  &:hover {
    color: red;
  }
`;

export default withRouter(({ location: { pathname } }) => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };
  const outHover = () => {
    setHover(false);
  };

  // 스크롤 이벤트
  const [position, setPosition] = useState(false);

  const onScroll = () => {
    if (window.scrollY >= 70) setPosition(true);
    else setPosition(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll); //메모리누수 방지
    };
  }, []);
  return (
    <>
      <Header current={pathname !== "/"} scrollY={position}>
        <List>
          <Logo>
            <SLink to="/">Logo</SLink>
          </Logo>
        </List>
        <List>
          <SubListBg hover={hover} />
          <Item
            current={pathname === "/Reservation"}
            onMouseOver={() => onHover()}
            onMouseOut={() => outHover()}
          >
            <SLink to="/Reservation">
              <LinkText>예매</LinkText>
              {console.log(hover)}
            </SLink>
            {["빠른예매", "예매안내", "예매권 등록"].map((item) => (
              <TabLi to="/" hover={hover}>
                {item}
              </TabLi>
            ))}
          </Item>
          <Item
            current={pathname === "/Movies"}
            onMouseOver={() => onHover()}
            onMouseOut={() => outHover()}
          >
            <SLink to="/Movies">
              <LinkText>영화</LinkText>
            </SLink>
            <TabUl>
              {[
                "예매순위",
                "현재상영작",
                "개봉예정작",
                "박스오피스",
                "영화제영화",
                "예고편",
              ].map((item) => (
                <TabLi to="/" hover={hover}>
                  {item}
                </TabLi>
              ))}
            </TabUl>
          </Item>
          <Item
            current={pathname === "/Theater"}
            onMouseOver={() => onHover()}
            onMouseOut={() => outHover()}
          >
            <SLink to="/Theater">
              <LinkText>극장</LinkText>
            </SLink>
            <TabUl>
              {["빠른예매", "예매안내", "예매권 등록"].map((item) => (
                <TabLi to="/Movies" hover={hover}>
                  {item}
                </TabLi>
              ))}
            </TabUl>
          </Item>
          <Item
            current={pathname === "/Event"}
            onMouseOver={() => onHover()}
            onMouseOut={() => outHover()}
          >
            <SLink to="/Event">
              <LinkText>이벤트</LinkText>
            </SLink>
            <TabUl>
              {["시사회", "이벤트", "당첨자발표"].map((item) => (
                <TabLi to="/" hover={hover}>
                  {item}
                </TabLi>
              ))}
            </TabUl>
          </Item>
          <Item
            current={pathname === "/Store"}
            onMouseOver={() => onHover()}
            onMouseOut={() => outHover()}
          >
            <SLink to="/Store">
              <LinkText>스토어</LinkText>
            </SLink>
            <TabUl>
              {["티켓", "식음료", "포인트"].map((item) => (
                <TabLi to="/" hover={hover}>
                  {item}
                </TabLi>
              ))}
            </TabUl>
          </Item>
        </List>

        <List>
          <LoginItem current={pathname === "/Join"}>
            <SLink to="/Join">회원가입</SLink>
          </LoginItem>
          <LoginItem current={pathname === "/Login"}>
            <SLink to="/Login">로그인</SLink>
          </LoginItem>
        </List>
      </Header>
    </>
  );
});
