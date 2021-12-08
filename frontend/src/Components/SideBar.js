import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import { UserContext } from "context";
import { Link } from "react-router-dom";
import {useCookies} from "react-cookie";
import {setToken} from "../junsu-api";

const UserInfo = styled.div`
  display: grid;
  /* justify-content: space-between; */
  /* align-items: center; */
  grid-template-columns: 9fr 1fr;
  gap: 10px;
  width: 75%;
  height: 60px;
  margin: 10px 0 50px 0;
`;

const UserName = styled.div`
  margin-top: 35px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d1d1d1;
  font-size: 18px;
`;

const Exit = styled.div`
  cursor: point;
  margin-top: 25px;
`;

const NavList = styled.ul`
  width: 230px;
  height: 230px;
  display: grid;
  grid-template-columns: 110px 110px;
  gap: 10px 12px;
`;

const NavItem = styled.li`
  width: 100%;
  height: 100%;
  border: 0.5px solid #d1d1d1;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: red;
  }
`;

const Context = styled.span`
  text-align: center;
  font-size: 15px;
`;

const SideBar = ({ setSideBar }) => {
    const [cookies, setCookies, removeCookie] = useCookies(['token']);
    const { userInfo, handleUserInfo } = useContext(UserContext);

    useEffect(() => {
        if(cookies.token) {
            handleUserInfo(cookies.token);
            setToken(cookies);
        }
    }, [cookies])

  const NavItemContext = [
    "로그아웃",
    "예매권/할인권등록",
    "고객센터",
    "할인안내",
  ];

  return (
    <>
      <UserInfo>
        <UserName>
          {userInfo.token ? (
            userInfo.token_docode &&
            `${userInfo.token_docode.email.split("@")[0]}님 안녕하세요!`
          ) : (
            <Link to="/Login">로그인을 해주세요.</Link>
          )}
        </UserName>
        <Exit onClick={() => setSideBar(false)}>❌</Exit>
      </UserInfo>
      <NavList>
        {NavItemContext.map((data, idx) => {
            if(idx === 0) {
                return(
                    <NavItem>
                        <Context onClick={() => removeCookie('token')}>{data}</Context>
                    </NavItem>
                    )
            } else {
                return (
                    <NavItem>
                        <Context>{data}</Context>
                    </NavItem>
                );
            }

        })}
      </NavList>
    </>
  );
};

export default SideBar;
