import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import Checking from "./MyPageInfoDetail/Checking"
import Registration from "./MyPageInfoDetail/Registration"
import PreferActor from "./MyPageInfoDetail/PreferActor";
import PreferDirector from "./MyPageInfoDetail/PreferDirector"
import { PortraitSharp } from "@material-ui/icons";
import { Link, Switch, Route } from "react-router-dom";
import MyPageMyRating from "./MyPageMyRating";
import MyPageMyMovie from "./MyPageMyMovie";
import {UserContext} from "context";
import {socialAPI, useToken} from "../junsu-api";

const Container = styled.div`
  position: relative;
  padding-top: 70px;
  * {
    box-sizing: border-box;
  }
`;

const Content = styled.div`
  color: #777;
`;

const UserArea = styled.div`
  padding-bottom: 100px;
`;
const UserGradeArea = styled.div`
  background: #ddd;
  padding-top: 70px;
  height: 172px;
  font-size: 30px;
  color: #2b2b2b;
  text-align: center;
  /* letter-spacing: -1px; */
`;
const UserCont = styled.div`
  margin: auto;
  width: 1200px;
`;
const UserInfoArea = styled.div`
  padding-top: 60px;
`;
const UserAccArea = styled.div`
  display: inline-block;
  width: 50%;
  vertical-align: top;
  padding-right: 15px;
`;
const UserAccTitle = styled.div`
  position: relative;
  margin: 0 0 20px;
  font-size: 20px;
  color: #2b2b2b;
`;
const UserContBox = styled.div`
  height: 260px;
  margin-top: 15px;
  border: 1px solid #e5e5e5;
  background: #fff;
`;
const UserAccCont = styled.div`
  padding: 30px 0 30px 0;
  position: relative;
`;
const UserAccBox = styled.div`
  padding: 70px 0 70px 0;
  display: inline-block;
  width: calc(100% / 3);
  height: 200px;
  vertical-align: top;
  border-left: 1px solid #e5e5e5;
  text-align: center;
  :nth-child(1){
    padding-left: 10px;
    border-left: none;
  }
  :nth-child(3){
    padding-right: 10px;
  }
`;
const UserMovieInfo = styled.div`
  display: inline-block;
  width: 50%;
  vertical-align: top;
  padding-left: 15px;
`;
const UserCinemaArea = styled.div`
  width: 585px;
  height: 140px;
`;
const UserCinemaBox = styled.div`
  padding-top: 45px;
  height: 100px;
  font-size: 16px;
  color: #2b2b2b;
  font-weight: normal;
  text-align: center;
  letter-spacing: -1px;
  margin-top: 15px;
    border: 1px solid #e5e5e5;
    background: #fff;
`;
const UserMovieArea = styled.div`
  margin-top: 30px;
`;
const UserBoxInner = styled.div`
    position: relative;
    display: inline-block;
    width: 50%;
    height: 100%;
    vertical-align: top;
    text-align: center;
`;
const TabInfo = styled.div`
  margin-top: 110px;
  height: auto;
`;
const TabMenu = styled.ul`
  display: table;
  table-layout: fixed;
  width: 100%;
`;
const TabMenuItem = styled.li`
  border-bottom: 1px solid #b4b4b4;
  padding-top: 30px;
  display: table-cell;
  text-align: center;
  font-size: 0;
  list-style: none;
  :active {
    border-bottom: 3px solid #2b2b2b;
    color: #2b2b2b;
  }
`;
const TabItemLink = styled.a`
  padding-bottom: 28px;
  display: inline-block;
  vertical-align: top;
  font-size: 17px;
  color: #777;
  outline: none;
  text-align: center;
  list-style: none;
  cursor: pointer;
`;
const SLink = styled(Link)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MyPage = () => {
  const [tabClick, setTabClick] = useState(0);

  const [profile, setProfile] = useState({
    profile: null,
    loading: true,
    error: null
  });

  const [actors, setActors] = useState({
    actors: null,
    loading: true,
    error: null
  });

  const [directors, setDirectors] = useState({
    directors: null,
    loading: true,
    error: null
  });

  useEffect(async () => {
    try {

      const { data: { user, grade, mileage } } = await socialAPI.profile();
      setProfile((prevState) => ({
        ...prevState,
        profile: {
          ...user,
          ...grade,
          mileage: mileage
        }
      }));

      const { data: { actors } } = await socialAPI.preferActor();
      const { data: { directors } } = await socialAPI.preferDirector();
      setActors((prevState) => ({
        ...prevState,
        actors: actors
      }))
      setDirectors((prevState) => ({
        ...prevState,
        directors: directors
      }))
    }
    catch (e) {
      setProfile((prevState) => ({
        ...prevState,
        error: e
      }));
    } finally {
      setProfile((prevState) => ({
        ...prevState,
        loading: false
      }))
    }
  }, []);



  const originTabStyle = {
    borderBottom: "1px solid #b4b4b4",
    color: "#b4b4b4"
  }
  const activeTabStyle = {
    borderBottom: "3px solid #2b2b2b",
    color: "#2b2b2b"
  }

  return (
      <>
      {
        profile.profile ? (
            <Container>
              <Content>
                <UserArea>
                  <UserGradeArea>
                    {profile.profile && profile.profile.full_name}님은 <span style={{ color: "#787878" }}> {profile.profile.name} </span> 회원입니다
                  </UserGradeArea>
                  <UserCont>
                    <UserInfoArea>
                      <UserAccArea>
                        <UserAccTitle>MY 계좌</UserAccTitle>
                        <UserContBox>
                          <UserAccCont>
                            <UserAccBox>
                              <p style={{ paddingBottom: "12px", fontSize: "15px", color: "#777" }}>DB 포인트</p>
                              <p style={{ fontSize: "20px", color: "#2b2b2b" }}>{profile.profile && `${profile.profile.mileage} POINT`}</p>
                            </UserAccBox>
                            <UserAccBox>
                              <p style={{ paddingBottom: "12px", fontSize: "15px", color: "#777" }}>DB 머니</p>
                              <p style={{ fontSize: "20px", color: "#2b2b2b" }}>0원</p>
                            </UserAccBox>
                            <UserAccBox>
                              <p style={{ paddingBottom: "12px", fontSize: "15px", color: "#777" }}>
                                <span style={{ marginRight: "24px" }}>예매권</span>
                                <span>할인권</span>
                              </p>
                              <p style={{ fontSize: "20px", color: "#2b2b2b" }}>
                                <span style={{ marginRight: "36px" }}>0매</span>
                                <span>1매</span>
                              </p>
                            </UserAccBox>
                          </UserAccCont>
                        </UserContBox>
                      </UserAccArea>
                      <UserMovieInfo>
                        <UserCinemaArea>
                          <UserAccTitle>MY 극장</UserAccTitle>
                          <UserCinemaBox>MY극장을 설정해 주세요.</UserCinemaBox>
                        </UserCinemaArea>
                        <UserMovieArea>
                          <UserAccTitle>MY 영화</UserAccTitle>
                          <UserCinemaBox style={{ height: "90px", paddingTop: "0" }}>
                            <UserBoxInner>
                              <SLink to="MyPage/MyRating" style={{ color: "#2b2b2b", top: "36px", position: "relative" }}>나의 평점 모아보기</SLink>
                            </UserBoxInner>
                            <UserBoxInner style={{ borderLeft: "1px solid #e5e5e5" }}>
                              <SLink to="MyPage/MyMovie" style={{ color: "#2b2b2b", top: "36px", position: "relative" }}>내가 본 영화</SLink>
                            </UserBoxInner>
                          </UserCinemaBox>
                        </UserMovieArea>
                      </UserMovieInfo>
                    </UserInfoArea>
                    <TabInfo>
                      <TabMenu>
                        {["예매확인/취소", "예매권/할인권 등록", "선호하는 배우", "선호하는 감독"].map((tabName, idx) => {
                          return (
                              <>
                                {tabClick === idx ? (
                                    <TabMenuItem style={activeTabStyle}>
                                      <TabItemLink onClick={() => { setTabClick(idx) }}>{tabName}</TabItemLink>
                                    </TabMenuItem>
                                ) : (
                                    <TabMenuItem style={originTabStyle}>
                                      <TabItemLink onClick={() => { setTabClick(idx) }}>{tabName}</TabItemLink>
                                    </TabMenuItem>
                                )}
                              </>
                          )
                        })}
                      </TabMenu>
                      <TabContent tabClick={tabClick} actors={actors} directors={directors}/>
                    </TabInfo>
                  </UserCont>
                </UserArea>
              </Content>
            </Container>
        ) : <div></div>
      }
      </>
  );
};


const TabContent = (props) => {
  if (props.tabClick === 0) {
    return (
      <Checking id={props.id} />
    )
  } else if (props.tabClick === 1) {
    return (
      <Registration id={props.id} />
    )
  } else if (props.tabClick === 2) {
    return (
      <PreferActor actorList={props.actors.actors}  />
    )
  } else {
    return (
      <PreferDirector directorList={props.directors.directors} />
    )
  }
}

export default MyPage;
