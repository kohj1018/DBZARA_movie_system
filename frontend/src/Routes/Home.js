import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import MoviePoster from "Components/MoviePoster";
import { moviesApi } from "api";
import { Link } from "react-router-dom";
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DraftsIcon from '@material-ui/icons/Drafts';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TheatersIcon from '@material-ui/icons/Theaters';

// TODO styled-component 컴포넌트화 만들기
// TODO bgimg => img태그 변경
// TODO CSS 추가 항목들
/*
firstimg 
  컨테이너 hover -> 양 사이드 넘김 버튼 
  컴포넌트 hovet -> 뒤집히는 효과, 중간에 제목, 순위, %띄우기 && 
  자동으로 넘기기 
  밑에 현재 위치 표시 + 중지

Randking
  뒤에 현재 어디인지 보이기
  nav만들기 (페이지 이동 없이 state 변경으로? )
  1,7번째 poster 흐릿
  view기준 양 사이드 흐릿
  양 사이드 넘김 버튼, 슬라이드 효과

bestPlay
  스크롤 인 -> 사이드 3개 보이기
  사이드 hover -> 흐릿

Evnet
  스크롤 -> 진행중인 event 보이기
*/

const Home = () => {
  let [movies, setMovies] = useState({
    popular: null,
    error: null,
    loading: true,
  });

  let [upComingMovies, setUpComingMovies] = useState({
    upComing: null,
    error: null,
    loading: true,
  });

  // nav 클릭시 바꿀 movies 데이터
  const NavList = ["RANKING", "BOXOFFICE", "COMING", "FESTIVAL"];
  const [onNav, setOnNav] = useState({
    data: null,
    navList: NavList[0],
  });

  async function feactApi() {
    try {
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      // console.log(data);
      setMovies((movies) => ({ ...movies, popular }));
      // console.log(popular);

      const {
        data: { results: upComing },
      } = await moviesApi.upComing();
      setUpComingMovies((movies) => ({ ...movies, upComing }));

      setOnNav((onNav) => ({ ...onNav, data: movies.popular }));
    } catch {
      setMovies((movies) => ({
        ...movies,
        error: "영화 정보를 찾을 수 없습니다!",
      }));
    } finally {
      setMovies((movies) => ({ ...movies, loading: false }));
      setUpComingMovies((movies) => ({ ...movies, loading: false }));
    }
  }
  useEffect(() => {
    feactApi();
  }, []);

  // hover시 bg변경해야함
  let [onMouse, setOnMouse] = useState({
    hover: false,
    item: 0,
  });
  const handleHover = (index) => {
    setOnMouse({ hover: true, item: index });
  };

  //nav 클릭시 data바꿈
  const NavChange = (data, index) => {
    return setOnNav((onNav) => ({
      ...onNav,
      data,
      navList: NavList[index],
    }));
  };

  return (
    <HomePage>
      <FirstBgImg
        src={
          movies.popular
            ? `https://image.tmdb.org/t/p/original${
                movies.popular[onMouse.item].backdrop_path
              }`
            : require("../assets/noPosterSmall.png").default
        }
      />
      <FirstContext>
        <FirstImgInfo>
          <FirstImgInfoDetail>▶</FirstImgInfoDetail>
          <FirstImgName>
            {movies.popular ? movies.popular[onMouse.item].title : ""}
          </FirstImgName>
          <FirstImgRank>
            {movies.popular
              ? `${onMouse.item + 1}위 ${
                  movies.popular[onMouse.item].vote_average
                }`
              : ""}
          </FirstImgRank>
        </FirstImgInfo>
        <FirstPosterContainer>
          <FirstPosters>
            {movies.popular &&
              movies.popular.length > 0 &&
              movies.popular.slice(0, 5).map((movies, index) => {
                return (
                  // TODO 중앙에 정보 띄우기 + 너무 느림 -> 띄울 5개 데이터는 받아와서 저장 후 보여주기
                  <FirstSize>
                    {/* {console.log(onMouse)} */}
                    {/* <FirstSize> */}
                    {/* // TODO 애니메이션 왜 안먹힘? */}
                    <TurnYPoster onMouseOver={() => handleHover(index)}>
                      <MoviePoster
                        key={movies.id}
                        id={movies.id}
                        bgUrl={movies.poster_path}
                        index={index + 1}
                      />
                    </TurnYPoster>
                  </FirstSize>
                );
              })}
          </FirstPosters>
        </FirstPosterContainer>
      </FirstContext>
      {/* 랭킹 */}
      <Ranking>
        <RankingMenu>
          <RankingMenubgImg>{onNav.navList}</RankingMenubgImg>
          {/* //TODO component로 변경하기 */}
          <Rankingli
            onClick={() => NavChange(movies.popular, 0)}
            current="RANKING"
            state={onNav.navList}
          >
            예매순위
          </Rankingli>
          <Rankingli
            onClick={() => NavChange(movies.popular, 1)}
            current="BOXOFFICE"
            state={onNav.navList}
          >
            박스오피스
          </Rankingli>
          <Rankingli
            onClick={() => NavChange(upComingMovies.upComing, 2)}
            current="COMING"
            state={onNav.navList}
          >
            개봉예정작
          </Rankingli>
          <Rankingli
            onClick={() => NavChange(movies.popular, 3)}
            current="FESTIVAL"
            state={onNav.navList}
          >
            영화제영화
          </Rankingli>
        </RankingMenu>
        {onNav ? (
          <RankingContainer>
            {/* //TODO 1,7번째 흐리게 && 양 사이드 흐리게*/}
            {/* //TODO 초기 화면 안뜨는 문제 발생 */}
            {onNav.data &&
              onNav.data.length > 0 &&
              onNav.data.slice(0, 10).map((movies, index) => {
                return (
                  <RankingSize>
                    <MoviePoster
                      key={movies.id}
                      id={movies.id}
                      bgUrl={movies.poster_path}
                      index={index + 1}
                    />
                    <MovieInfo>
                      <MovieName>{movies.title}</MovieName>
                      <MovieVote>
                        {onNav.navList === "RANKING"
                          ? `${movies.vote_average}점`
                          : ""}
                      </MovieVote>
                    </MovieInfo>
                  </RankingSize>
                );
              })}
          </RankingContainer>
        ) : (
          ""
        )}
      </Ranking>
      {/* 베스트다운로드 */}
      <BestPlay>
        <BestMainTitle>
          <BestMainTilteP>BEST PLAY</BestMainTilteP>
        </BestMainTitle>
        <BestMainBox>
          <BestMainContainer>
            {/* //TODO 영화component로 변경 */}
            <MoviePoster></MoviePoster>
          </BestMainContainer>
          <BestSubContainer>
            {[1, 2, 3].map((i) => {
              return (
                <BestSubMovie>
                  <MoviePoster key={i}>i</MoviePoster>
                </BestSubMovie>
              );
            })}
          </BestSubContainer>
        </BestMainBox>
      </BestPlay>
      {/* 이벤트 */}
      <Event>
        <EventTitle>Event</EventTitle>
        <EventImgs>
          {[1, 2, 3].map((i) => {
            return (
              <EventImg>
                <MoviePoster key={i}></MoviePoster>
              </EventImg>
            );
          })}
        </EventImgs>
      </Event>
      {/* 공지사항 */}
      <Notice>
        <NoticeInner>
          <NoticeTitle>
            {/* 링크 걸기 */}
            <NoticeTitleContext>공지사항</NoticeTitleContext>
            <NoticeTitleItem>[안내] 어쩌구 저쩌구...</NoticeTitleItem>
          </NoticeTitle>
        </NoticeInner>
        <NoticeInfo>
          {/* nav 사용 */}
          <NoticeInfoList>
            {/* {[1, 2, 3, 4, 5, 6].map((i) => ( */}
              <NoticeInfoItem>
                <a href="http://www.yes24.com/Mall/Help/CS/Apply" style={{fontSize:"14px",color:"#2b2b2b", outline:"none"}}>
                  <span>1:1상담</span>
                  <Icon>
                    <HeadsetMicIcon fontSize="large" style={{height: "48px", width: "48px", margin:"10px 0 0"}}/>
                  </Icon>
                </a>
              </NoticeInfoItem>
              <NoticeInfoItem>
                <a href="https://movie.yes24.com/HelpDesk/Faq/" style={{fontSize:"14px",color:"#2b2b2b", outline:"none"}}>
                  <span>FAQ</span>
                  <Icon>
                    <QuestionAnswerIcon fontSize="large"style={{height: "48px", width: "48px", margin:"12px 0 0"}}/>
                  </Icon>
                </a>
              </NoticeInfoItem>
              <NoticeInfoItem>
                <a href="https://movie.yes24.com/HelpDesk/DiscountInfo" style={{fontSize:"14px",color:"#2b2b2b", outline:"none"}}>
                  <span>할인안내</span>
                  <Icon>
                    <MonetizationOnIcon fontSize="large" style={{height: "46px", width: "46px", margin:"10px 0 0"}}/>
                  </Icon>
                </a>
              </NoticeInfoItem>
              <NoticeInfoItem>
                <a href="https://movie.yes24.com/HelpDesk/CouponInfo" style={{fontSize:"14px",color:"#2b2b2b", outline:"none"}}>
                  <span>예매권안내</span>
                  <Icon style={{margin:"auto"}}>
                    <DraftsIcon fontSize="large" style={{height: "48px", width: "48px", margin:"12px 0 0"}}/>
                  </Icon>
                </a>
              </NoticeInfoItem>
              <NoticeInfoItem>
                <a href="https://movie.yes24.com/HelpDesk/GuideInfo" style={{fontSize:"14px",color:"#2b2b2b", outline:"none"}}>
                  <span>예매 안내</span>
                  <Icon>
                    <AccessTimeIcon fontSize="large" style={{height: "48px", width: "48px", margin:"10px 0 0"}}/>
                  </Icon>
                </a>
              </NoticeInfoItem>
              <NoticeInfoItem>
                <a href="https://movie.yes24.com/HelpDesk/TheaterInfo" style={{fontSize:"14px",color:"#2b2b2b", outline:"none"}}>
                  <span>극장안내</span>
                  <Icon>
                    <TheatersIcon fontSize="large" style={{height: "48px", width: "48px", margin:"12px 0 0"}}/>
                  </Icon>
                </a>
              </NoticeInfoItem>
                {/* <MoviePoster key={i}></MoviePoster> */}
              {/* </NoticeInfoItem> */}
            {/* ))} */}
          </NoticeInfoList>
        </NoticeInfo>
      </Notice>
    </HomePage>
  );
};

export default Home;

const HomePage = styled.div`
  overflow-x: hidden;
`;

// 추천 영화

const fadeOut = keyframes`{
  from {
  	opacity: 0;
  }
  to {
 	  opacity: 1;
  }
}`;
const FirstBgImg = styled.img`
  width: 100%;
  height: 650px;
  position: absolute;
  z-index: -1;
  animation: ${fadeOut} 1s;
`;

const FirstContext = styled.section`
  height: 650px;
  flex-direction: column;
  position: relative;
`;

const FirstImgInfo = styled.section`
  position: absolute;
  top: 130px;
  flex-direction: column;
  justify-content: flex-start;
  height: 192px;
`;
const FirstImgInfoDetail = styled(Link)`
  font-size: 50px;
  margin-bottom: 40px;
`;
const FirstImgName = styled.span`
  font-size: 40px;
  font-weight: 600;
  color: white;
  margin-bottom: 15px;
`;
const FirstImgRank = styled.span`
  font-size: 20px;
  color: RGB(230, 230, 230);
`;

const FirstPosterContainer = styled.section`
  height: 370px;
  bottom: 0;
  position: absolute;
  flex-direction: column;
`;

const FirstSize = styled.div`
  margin: 0 5px 0 5px;
  width: 130px;
  height: 180px;
`;

// TODO 아니 왜 안돼? */
const turnY = keyframes`
0%{
  transfrom: rotateY(0)
}
50%{
  transfrom: rotateY(90deg)
}
100%{
  transfrom: rotateY(0)
}`;

const TurnYPoster = styled.div`
  height: 100%;
  width: 100%;
  transition: transform 0.5s ease-in-out;
  /* animation: ${turnY} 0.5s ease-in-out; */
  &:hover {
    transform: rotateY(
      360deg
    ); //낄낄,,,돌려돌려돌림판,,,낄낄,,,,,,,왜 안되는데...왜....제발 이유만 말해줘..
  }
`;

const FirstPosters = styled.div`
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 랭크별
const Ranking = styled.div`
  padding: 50px 0 50px 0;
  margin-top: 40px;
  height: 600px;
`;

const RankingMenu = styled.ul`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 92px;
`;
const RankingMenubgImg = styled.span`
  z-index: -1;
  position: absolute;
  bottom: -13px;
  font-size: 150px;
  font-weight: 600;
  color: RGB(233, 233, 233);
`;

const Rankingli = styled.li`
  margin-right: 30px;
  padding-bottom: 5px;
  color: black;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 3px solid
    ${(props) => (props.current === props.state ? "black" : "transparent")};
`;
const RankingContainer = styled.div`
  min-width: 1200px;
  margin-top: 35;
  height: 370px;
  top: 280px;
  display: flex;
`;

const RankingSize = styled.div`
  position: relative;
  margin-right: 20px;
  min-width: 256px;
  height: 372px;
  display: flex;
  justify-content: center;
`;

const MovieInfo = styled.div`
  width: 80%;
  height: 30px;
  display: flex;
  bottom: 0;
  justify-content: space-between;
  position: absolute;
`;

const MovieName = styled.span`
  color: white;
  font-size: 15px;
`;

const MovieVote = styled.span`
  color: red;
  font-size: 15px;
`;

// 베스트영상
const BestPlay = styled.section`
  padding: 60px 0 150px 0;
  width: 100%;
  height: 750px;
  flex-direction: column;
`;

const BestMainTitle = styled.section`
  min-width: 1200px;
  height: 40px;
`;
const BestMainTilteP = styled.span`
  color: black;
  font-size: 45px;
  font-weight: 600;
`;

const BestMainBox = styled.section`
  justify-content: end;
  position: relative;
`;

const BestMainContainer = styled.section`
  margin-top: 50px;
  width: 1200px;
  height: 450px;
`;

const BestSubContainer = styled.section`
  width: 335px;
  height: 492px;
  position: absolute;
  top: 35px;
  border: 1px solid red;
  flex-direction: column;
`;

const BestSubMovie = styled.section`
  width: 100%;
  height: 33%;
  margin-bottom: 10px;
`;

//이벤트
const Event = styled.section`
  padding-bottom: 60px;
  height: 520px;
  flex-direction: column;
`;

const EventTitle = styled.section`
  height: 170px;
`;

const EventImgs = styled.section`
  width: 1200px;
  margin: auto;
`;

const EventImg = styled.div`
  width: 380px;
  height: 265px;
  margin: 0 30px 30px 0;
`;

// 공지사항
const Notice = styled.section`
  margin: 60px 0 70px 0;
  flex-direction: column;
`;

const NoticeInner = styled.div`
  width: 1200px;
  margin: auto;
  padding: 25px 0;
  border-top: 2px solid #2b2b2b;
  border-bottom: 2px solid #2b2b2b; ;
`;
const NoticeTitle = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
`;
const NoticeTitleContext = styled.span`
  color: black;
  font-size: 25px;
  font-weight: 500;
`;
const NoticeTitleItem = styled.p`
  margin-left: 30px;
  font-size: 18px;
  color: black;
`;
const NoticeInfo = styled.div`
  width: 1200px;
  height: 74px;
  border: 0px solid #2b2b2b;
  margin: 60px 0;
  /* height: 75px; */
`;

const NoticeInfoList = styled.ul`
  height: 74px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.div`
  height: 48px;
  width: 48px;
  display: block;
`;
const NoticeInfoItem = styled.div`
  display: flex;
  vertical-align: top;
  border-left: 1px solid #e1e1e1;
  text-align: center;
  :nth-child(1){
    border-left: none;
    padding: 0 58px  0 0;
    width: 107px;
    height: 74px;
  }
  :nth-child(2){
    padding: 0 60px 0 68px;
    width: 177px;
    height: 74px;
  }
  :nth-child(3){
    padding: 0 62px 0 62px;
    width: 177px;
    height: 67px;
  }
  :nth-child(4){
    padding: 0 58px 0 50px;
    width: 171.56px;
    height: 70px;
  }
  :nth-child(5){
    padding: 0 53px 0 50px;
    width: 157.34px;
    height: 69px;
  }
  :nth-child(6){
    padding: 0 0 0 58px;
    width: 108.47px;
    height: 72px;
  }
`;
