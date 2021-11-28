import React from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";
import movieData from "movieData";
import MoviesInfoTab from "./MoviesInfoTab";

const MoviesInfo = ({ match }) => {
  const tabHandler = (path) => {
    this.props.history.push(path);
  }
  return (
    <>
      <Container>
        {/* 선택된 영화 이미지 블러 효과 부분 */}
        <DetailBannerArea>
          <BgBlurArea>
            <BgImg src={movieData[match.params.id].detailSrc}></BgImg>
          </BgBlurArea>
          <DetailMovieInfo>
            <ImgThumb>
              <Poster src={movieData[match.params.id].src}></Poster>
            </ImgThumb>
            <InfoTxt>
              <Title>{movieData[match.params.id].title}</Title>
              <EngTit>{movieData[match.params.id].engTitle}</EngTit>
              <TxtBundle>
                <Txt>예매율 {movieData[match.params.id].rank}위 {movieData[match.params.id].ticketSales}</Txt>
                <Txt>평점 {movieData[match.params.id].rates}</Txt>
              </TxtBundle>
              <TxtBundle>
                <Txt>{movieData[match.params.id].releaseDate} 개봉</Txt>
                <Txt>{movieData[match.params.id].runningTime} 분</Txt>
                <Txt>12세이상관람가</Txt>
                <Txt>{movieData[match.params.id].country}</Txt>
                <BtnArea>
                  <ReserveBtn>예매</ReserveBtn>
                  <ShareBtn></ShareBtn>
                </BtnArea>
              </TxtBundle>
            </InfoTxt>
          </DetailMovieInfo>
        </DetailBannerArea>
        {/* 영화 콘텐츠 내용 부분 */}
        <DetailCont>
          <GraphArea>
            <GraphAreaTitle>예매분석</GraphAreaTitle>
            <GraphCont>
              <GraphGender>
                <GrTitle>연령별/성별 예매율</GrTitle>
                <GraphGrid>
                  <GraphBar>
                      {movieData[match.params.id].agePercent.map((age, index) => {
                        return (
                          <BarDrawCont>
                            <BarLabel>{index+1}0대</BarLabel>
                            <BarDraw>
                              <BarPercent style={{width: `${age}px`}}></BarPercent>
                              <GraphTool>{age}%</GraphTool>
                            </BarDraw>
                          </BarDrawCont>
                        )
                      })}
                  </GraphBar>
                  <GraphSex>
                    <SexMale style={{height: movieData[match.params.id].sexPercent.male}}></SexMale>
                    <SexMaleTxt style={{height: movieData[match.params.id].sexPercent.male}}>{movieData[match.params.id].sexPercent.male}</SexMaleTxt>
                    <SexFemale style={{height: movieData[match.params.id].sexPercent.female}}></SexFemale>
                    <SexFemaleTxt style={{height: movieData[match.params.id].sexPercent.female}}>{movieData[match.params.id].sexPercent.female}</SexFemaleTxt>
                  </GraphSex>
                </GraphGrid>
              </GraphGender>
              <GraphDayAdn>
                <GrTitle>일일 관객수</GrTitle>
                <GraphDayAdnView>
                  <GrTxt>{movieData[match.params.id].dayAdn}명</GrTxt>
                  <GrTxt02>(11월26일 기준)</GrTxt02>
                </GraphDayAdnView>
              </GraphDayAdn>
              <GraphDayAdnCum>
                <GrTitle>누적 관객수</GrTitle>
                <GraphChart></GraphChart>
              </GraphDayAdnCum>
              <GraphDaySales>
                <GrTitle>누적 매출액</GrTitle>
                <GrsTxt>(단위:천원)</GrsTxt>
                <GraphChart></GraphChart>
              </GraphDaySales>
            </GraphCont>
            <GraphBtnArea>
              <GraphArrowBtn></GraphArrowBtn>
            </GraphBtnArea>
          </GraphArea>
          <DetailTabArea>
            <Router>
              <TabMenu>
                {MoviesInfoTab.map(tab => {
                  return (
                    <TabMenuItem>
                      <TabItemLink to={`${tab.pathFetch}/${match.params.id}`}>{tab.tabName}</TabItemLink>
                    </TabMenuItem>
                  )
                })}
              </TabMenu>
              <Switch>
                {MoviesInfoTab.map(tab => {
                  return (
                    <Route
                      key={movieData[match.params.id].id}
                      path={tab.path}
                      component={tab.component}
                      exact
                    >
                    </Route>
                  )
                })}
              </Switch>
            </Router>
          </DetailTabArea>
        </DetailCont>
      </Container>
    </>
  )
};

export default MoviesInfo;

const Container = styled.div`
  margin: 0 0 200px;
  min-width: 1200px;
`;

const DetailBannerArea = styled.div`
  position: relative;
  height: 540px;
  background: #000;
  overflow: hidden;
`;

const BgBlurArea = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 580px;
  z-index: 1;
`;

const BgImg = styled.img`
  width: 100%;
  height: 100%;
  x: 0;
  y: 0;
  -webkit-filter: blur(5px);
`;

const DetailMovieInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 0;
  color: #fff;
  text-align: center;
  z-index: 5;
`;

const ImgThumb = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
  margin-right: 60px;
  width: 290px;
  height: 440px;
  overflow: hidden;
  border: 0px solid rgba(255, 255, 255, .1);
`;

const Poster = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  max-height: 100%;
`;

const InfoTxt = styled.div`
  display: inline-block;
  vertical-align: top;
  text-align: left;
  padding-top: 60px;
`;

const Title = styled.p`
  font-size: 50px;
  line-height: 60px;
  font-family: nanumB, '맑은 고딕','Malgun Gothic','Helvetica','Apple SD Gothic Neo',AppleGothic,'돋움',Dotum,'굴림',Gulim,Helvetica,sans-serif;
  letter-spacing: -2px;
  max-width: 700px;
`;

const EngTit = styled.p`
  margin: 14px 0 35px;
  font-size: 13px;
  opacity: .4;
`;

const TxtBundle = styled.p`
  margin-bottom: 10px;
`;

const Txt = styled.span`
  position: relative;
  margin-left: 9px;
  padding-left: 10px;
  display: inline-block;
  vertical-align: top;
  font-size: 15px;
  :first-child {
    margin-left: 0;
    padding-left: 0;
  }
  :before {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    width: 1px;
    height: 10px;
    background: rgba(255,255,255,.2);
  }
`;

const BtnArea = styled.div`
  position: absolute;
  bottom: 50px;
`;

const ReserveBtn = styled.button`
  padding: 20px 0 19px;
  margin-right: 10px;
  min-width: 160px;
  line-height: 1;
  text-align: center;
  font-size: 14px;
  border: 1px solid rgba(255, 255, 255, .6);
  background: none;
  color: #fff;
  cursor: pointer;
  &:hover {
    color: #ec6159;
    border: 1px solid #ec6159;
  }
`;

const ShareBtn = styled.button`
  width: 25px;
  height: 26px;
  margin: 15px 0 0 30px;
  padding: 0;
  vertical-align: top;
  border: 0;
  cursor: pointer;
  background: url('//movie-img.yes24.com/NYes24/new/all_sprite.png') no-repeat -288px -520px;
`;

const DetailCont = styled.div`
  width: 1200px;
  margin: auto;
  padding-bottom: 120px;
`;

const GraphArea = styled.div`
  position: relative;
`;

const GraphAreaTitle = styled.div`
  position: relative;
  color: #2b2b2b;
  padding: 60px 0 30px;
  margin-bottom: 20px;
  font-family: nanumB, '맑은 고딕','Malgun Gothic','Helvetica','Apple SD Gothic Neo',AppleGothic,'돋움',Dotum,'굴림',Gulim,Helvetica,sans-serif;
  font-size: 22px;
  text-align: center;
`;

const GraphCont = styled.div`
  padding: 0 100px;
  height: 310px;
  font-size: 0;
  border-top: 0px solid #b4b4b4;
  background: #fff;
  transition: height .5s;
  overflow: hidden;
  border-radius: 150px;
`;

const GraphGender = styled.div`
  width: 265px;
  position: relative;
  display: inline-block;
  vertical-align: top;
`;

const GrTitle = styled.p`
  padding: 70px 0 20px;
  font-size: 15px;
  text-align: center;
  color: #2b2b2b;
`;

const GraphGrid = styled.div`
  margin-top: 10px;
  position: relative;
  font-size: 0;
`;

const GraphBar = styled.div`
  display: inline-block;
  width: calc(100% - (104px + 20px));
  vertical-align: top;
`;

const BarDrawCont = styled.div`
  margin-top: 10px;
  font-size: 0;
`;

const BarLabel = styled.div`
  padding-top: 3px;
  width: 30px;
  font-size: 10px;
  color: #999;
  display: inline-block;
  height: 13px;
  vertical-align: top;
`;

const BarDraw = styled.div`
  display: inline-block;
  height: 13px;
  vertical-align: top;
  position: relative;
  width: calc(100% - 30px);
  background: #ececec;
  cursor:pointer;
`;

const BarPercent = styled.div`
  width: 1.9px;
  height: 100%;
  background: #ec6159;
  transition: width .8s;
  cursor: pointer;
`;

const GraphTool = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  padding: 7px 5px 6px;
  display: none;
  font-size: 11px;
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
  cursor: pointer;
`;

const GraphSex = styled.div`
  position: relative;
  margin-left: 20px;
  width: 104px;
  height: 110px;
  background: #ececec;
  display: inline-block;
  vertical-align: top;
  :after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url(https://movie-img.yes24.com/NYes24/new/bg_sex.png) no-repeat 0 0;
    z-index: 5;
  }
`;

const SexMale = styled.div`
  width: 45px;
  background: #96b9fe;
  transition: height 1s;
  position: absolute;
  bottom: 0;
  font-size: 14px;
  color: #2b2b2b;
  text-align: center;
  letter-spacing: -1px;
  z-index: 2;
`;

const SexMaleTxt = styled.div`
  margin-top: 6px;
  bottom: 0;
  width: 45px;
  transition: height 1s;
  z-index: 10;
  font-size: 17px;
  position: absolute;
  color: #2b2b2b;
  text-align: center;
  letter-spacing: -1px;
`;

const SexFemale = styled.div`
  left: 45px;
  width: calc(100% - 45px);
  background: #fd9988;
  transition: height 1s;
  position: absolute;
  bottom: 0;
  font-size: 14px;
  color: #2b2b2b;
  text-align: center;
  letter-spacing: -1px;
  z-index: 2;
`;

const SexFemaleTxt = styled.div`
  margin-top: 6px;
  left: 48px;
  bottom: 0;
  width: calc(100% - 45px);
  transition: height 1s;
  z-index: 10;
  font-size: 17px;
  position: absolute;
  color: #2b2b2b;
  text-align: center;
  letter-spacing: -1px;
`;




const GraphBtnArea = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translate(-50%, 0);
  transition: bottom .3s;
`;

const GraphArrowBtn = styled.button`
  display: block;
  width: 16px;
  height: 9px;
  background: url(https://movie-img.yes24.com/NYes24/new/all_sprite.png) no-repeat -382px 0;
  font-size: 0;
  text-indent: -9999px;
  transform: rotate(-180deg);
  cursor: pointer;
  border: none;
`;

const GraphDayAdn = styled.div`
  position: relative;
  display: inline-block;
  width: calc((100% - 265px) / 3);
  vertical-align: top;
`;

const GraphDayAdnView = styled.div`
  background: url(https://movie-img.yes24.com/NYes24/new/img_graph02.png) no-repeat center 0;
  padding-top: 36px;
  height: 100px;
  text-align: center;
  color: #2b2b2b;
`;

const GrTxt = styled.p`
  font-size: 17px;
  font-family: nanumEB, '맑은 고딕','Malgun Gothic','Helvetica','Apple SD Gothic Neo',AppleGothic,'돋움',Dotum,'굴림',Gulim,Helvetica,sans-serif;
`;

const GrTxt02 = styled.p`
  padding-top: 3px;
  font-size: 11px;
  color: #777;
  font-family: nanumba, '맑은 고딕','Malgun Gothic','Helvetica','Apple SD Gothic Neo',AppleGothic,'돋움',Dotum,'굴림',Gulim,Helvetica,sans-serif;
`;

const GraphDayAdnCum = styled.div`
  position: relative;
  display: inline-block;
  width: calc((100% - 265px) / 3);
  vertical-align: top;
`;

const GraphChart = styled.div`
  position: relative;
  margin: auto;
  width: 190px;
  height: 112px;
  font-size: 0;
`;

// 

const GraphDaySales = styled.div`
  position: relative;
  display: inline-block;
  width: calc((100% - 265px) / 3);
  vertical-align: top;
`;

const GrsTxt = styled.p`
  position: absolute;
  top: 91px;
  left: 50%;
  margin-left: -145px;
  padding-right: 15px;
  width: 190px;
  font-size: 12px;
  color: #bbb;
  text-align: right;
`;

// --------------------------------------------------

const DetailTabArea = styled.div`
  margin-top: 70px;
  color: #777;
`;

const TabMenu = styled.ul`
  display: table;
  table-layout: fixed;
  width: 100%;
`;

const TabMenuItem = styled.li`
  border-top: 1px solid #b4b4b4;
  border-bottom: 1px solid #b4b4b4;
  padding-top: 30px;
  display: table-cell;
  text-align: center;
  font-size: 0;
  list-style: none;
  :active {
    padding-bottom: 0;
    border-bottom: 3px solid #2b2b2b;
  }
`;

const TabItemLink = styled(Link)`
  padding-bottom: 28px;
  display: inline-block;
  vertical-align: top;
  font-size: 17px;
  color: #777;
  outline: none;
  text-align: center;
  list-style: none;
  :active {
    color: #2b2b2b;
  }
`;
