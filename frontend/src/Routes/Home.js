import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import MoviePoster from "Components/MoviePoster";
import { moviesApi } from "api";
import { Link } from "react-router-dom";
import MovieVideo from "Components/MovieVideo";
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DraftsIcon from '@material-ui/icons/Drafts';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TheatersIcon from '@material-ui/icons/Theaters';

// TODO styled-component 컴포넌트화 만들기
// TODO CSS 추가 항목들
// TODO 여러곳에 사용되는 css 항목 styled-component Name = css``;로 따로 빼기
// ToDo 스크롤에 애니메이션, 슬라이드 애니메이션

const HomePage = styled.div`
  overflow-x: hidden;
`;

// 슬라이드 버튼
const SlideBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  z-index: 10;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
  opacity: 0;
  transition: 0.5s ease-in-out;
`;

const PrevBtn = styled(SlideBtn)`
  top: 300px;
  left: 10px;
`;
const NextBtn = styled(SlideBtn)`
  top: 300px;
  right: 10px;
`;

const Gradient = styled.div`
  width: 200px;
  position: absolute;
  z-index: 10;
`;

const MainLeft = styled(Gradient)`
  left: 0;
  /* width: 150px; */
  height: 650px;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.9) 10%,
    rgba(0, 0, 0, 0.7) 40%,
    rgba(0, 0, 0, 0.4) 70%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const MainRight = styled(Gradient)`
  right: 0;
  height: 650px;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0.7) 60%,
    rgba(0, 0, 0, 0.9) 90%,
    rgba(0, 0, 0, 1) 100%
  );
`;

const RankingLeft = styled(Gradient)`
  left: 0;
  height: 372px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(255, 255, 255, 0.7) 70%,
    rgba(255, 255, 255, 0.4) 90%,
    rgba(255, 255, 255, 0) 100%
  );
`;
const RankingRight = styled(Gradient)`
  right: 0;
  height: 372px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 10%,
    rgba(255, 255, 255, 0.7) 30%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(255, 255, 255, 1) 100%
  );
`;

const Home = () => {
  // 박스 오피스 순위
  let [movies, setMovies] = useState({
    popular: null,
    error: null,
    loading: true,
  });

  // 개봉 예정작
  let [upComingMovies, setUpComingMovies] = useState({
    upComing: null,
    error: null,
    loading: true,
  });

  // API 연결
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

      // setOnNav((onNav) => ({ ...onNav, data: movies.popular }));

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

  // 스크롤 이벤트
  const [position, setPosition] = useState({
    BestPlay: false,
    Event: false,
  });

  const onScroll = () => {
    if (600 <= window.scrollY && window.scrollY >= 700)
      setPosition((position) => ({ ...position, BestPlay: true }));
    if (1100 <= window.scrollY && window.scrollY >= 1300)
      setPosition((position) => ({ ...position, Event: true }));
  };


  // TODO focunIdx ==== -9, +9  : 에니매이션 적용 0.5s후 focunidx = 0, left = -9*276으로 변경

  // 이전 poster
  const prevSlide = () => {
    console.log("func전", focusIdx);
    if (focusIdx === 9) setFocusIdx(0);
    else setFocusIdx(focusIdx + 1);
    console.log("func후", focusIdx);
  };

  // 이후 poster
  const nextSlide = () => {
    if (focusIdx === -9) setTimeout(() => setFocusIdx(0), 500);
    else setFocusIdx(focusIdx - 1);
  };

  // nav 클릭시 바꿀 movies 데이터
  const NavList = ["RANKING", "BOXOFFICE", "COMING", "FESTIVAL"];
  // const Navcontext = ['예매순위','박스오피스','개봉예정작','영화제영화']
  const [onNav, setOnNav] = useState({
    data: null,
    navList: NavList[0],
  });

    // API연결 렌더링
    useEffect(() => {
      feactApi();
    }, []);

    // unmount 시 scroll 이벤트 제거
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll); //메모리누수 방지
    };
  }, []);

  //nav 클릭시 data바꿈
  const navChange = (data, index) =>
    setOnNav((onNav) => ({
      ...onNav,
      data,
      navList: NavList[index],
    }));

  // Ranking초기화면;
  useEffect(() => {
    navChange(movies.popular, 0);
  }, [movies]);


  // Ranking 현재 위치
  const [focusIdx, setFocusIdx] = useState(0);

  // const listPoster = useRef(null);

  // const makeClonePoster = (data) => {
  //   data.map();
  // };

  // makeClonePoster(onNav.data.slice(0.1));

  return (
    <HomePage>
      {/* {console.log(window.scrollY)} */}
      {/* 메인 poster */}
      <MainPoster movies={movies.popular} />
      {/* 랭킹 */}
      <Ranking>
        <RankingMenu>
          <RankingMenubgImg>{onNav.navList}</RankingMenubgImg>
          {/* //TODO component로 변경하기 */}
          <Rankingli
            onClick={() => navChange(movies.popular, 0)}
            current="RANKING"
            state={onNav.navList}
          >
            예매순위
          </Rankingli>
          <Rankingli
            onClick={() => navChange(movies.popular, 1)}
            current="BOXOFFICE"
            state={onNav.navList}
          >
            박스오피스
          </Rankingli>
          <Rankingli
            onClick={() => navChange(upComingMovies.upComing, 2)}
            current="COMING"
            state={onNav.navList}
          >
            개봉예정작
          </Rankingli>
          <Rankingli
            onClick={() => navChange(movies.popular, 3)}
            current="FESTIVAL"
            state={onNav.navList}
          >
            영화제영화
          </Rankingli>
        </RankingMenu>
        <RankingLeft />
        <RankingRight />
        {onNav.data ? (
          <RankingContainer>
            <RankingPosterUl current={focusIdx}>
              {console.log("end", focusIdx)}
              {[1, 2, 3].map(() =>
                onNav.data.slice(0, 10).map((movies, index) => {
                  return (
                    <RankingPoster>
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
                    </RankingPoster>
                  );
                })
              )}
            </RankingPosterUl>
            <PrevBtn onClick={() => prevSlide()}>◀</PrevBtn>
            <NextBtn onClick={() => nextSlide()}>▶</NextBtn>
          </RankingContainer>
        ) : (
          //loading화면
          <RankingContainer>
            <RankingPosterUl>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                <RankingPoster>
                  <MoviePoster />
                </RankingPoster>
              ))}
            </RankingPosterUl>
          </RankingContainer>
        )}
      </Ranking>
      {/* 베스트다운로드 */}
      <BestPlay>
        <BestMainTitle>
          <BestMainTilteP>BEST PLAY</BestMainTilteP>
        </BestMainTitle>
        <BestMainBox>
          {/* //TODO 영상component로 변경 */}
          <BestMainContainer>
            {movies.popular ?
            <MovieVideo
              id={movies.popular.[0].id}
            />: require("../assets/noPosterSmall.png").default}
          </BestMainContainer>
          <BestSubContainer scrollY={position.BestPlay}>
            {movies.popular && movies.popular.slice(1,4).map((movies, idx) => {
              return (
                <BestSubMovie>
                  <MovieVideo key={idx} id={movies.id} />
                </BestSubMovie>
              );
            })}
          </BestSubContainer>
        </BestMainBox>
      </BestPlay>
      {/* 이벤트 */}
      <Event>
        <EventTitle>
          <EventTitleSpan>Event</EventTitleSpan>
        </EventTitle>
        <EventImgs scrollY={position.Event}>
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

// 메인포스터
const MainPoster = ({ movies }) => {
  // hover시 bg변경해야함
  let [onMouse, setOnMouse] = useState({
    hover: false,
    item: 0,
  });
  const handleHover = (index) => {
    setOnMouse({ hover: true, item: index });
  };

  // TODO 이거 이용해서 animation먹여야 될것 같은데...
  useEffect(() => {
    console.log("item", onMouse.item);
  }, [onMouse.item]);
  return (
    movies &&(      
    <>
      <BgImg>
        <ImgContainer>
          <FirstBgImg
            current={onMouse.item}
            src={
              movies
                ? `https://image.tmdb.org/t/p/original${
                    movies[onMouse.item].backdrop_path
                  }`
                : require("../assets/noPosterSmall.png").default
            }
          />
          <MainLeft />
          <MainRight />
        </ImgContainer>
      </BgImg>
      <FirstContext>
        <FirstImgInfo>
          <FirstImgInfoDetail>▶</FirstImgInfoDetail>
          <FirstImgName>
            {movies[onMouse.item].title }
          </FirstImgName>
          <FirstImgRank>
            {`${onMouse.item + 1}위 ${movies[onMouse.item].vote_average}`
              }
          </FirstImgRank>
        </FirstImgInfo>
        <FirstPosterContainer>
          <FirstPosters>
            {
              movies.slice(0, 5).map((movies, index) => {
                return (
                  <FirstSize>
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
        <PrevBtn>◀</PrevBtn>
        <NextBtn>▶</NextBtn>
      </FirstContext>
      </>
      )
  );
};

// 추천 영화
const fadeOut = keyframes`{
  from {
  	opacity: 0;
  }
  to {
 	  opacity: 1;
  }
}`;

const BgImg = styled.div`
  width: 100%;
  height: 650px;
  position: absolute;
  z-index: -2;
  display: flex;
  justify-content: center;
  background-color: #000000;
`;
const ImgContainer = styled.div`
  width: 1920px;
  height: 650px;
  position: absolute;
  overflow: hidden;
  animation: ${fadeOut} 1s;
`;

const FirstBgImg = styled.img`
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: auto;
  position: absolute;
  object-fit: fill;
  z-index: -1;
`;

const FirstContext = styled.section`
  height: 650px;
  flex-direction: column;
  position: relative;
  &:hover {
    ${PrevBtn}, ${NextBtn} {
      opacity: 0.7;
    }
  }
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

const TurnYPoster = styled.div`
  height: 100%;
  width: 100%;
  transition: transform 0.5s ease-in-out;
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
  padding: 45px 0 50px 0;
  margin-top: 40px;
  height: 600px;
  position: relative;
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
  &:hover {
    ${PrevBtn} {
      opacity: 0.7;
    }
    ${NextBtn} {
      opacity: 0.7;
    }
  }
`;

const RankingPosterUl = styled.div`
  height: 370px;
  display: flex;
  position: absolute;
  gap: 20px;
  transition: 0.5s ease-out;
  ${(props) => console.log("styled", props.current)}
  ${(props) => `left:${(props.current - 9) * 276}px;`}
  ${(props) =>
    props.current === 8 ? setTimeout(() => `transition: null; `, 500) : ``};
`;

const RankingPoster = styled.div`
  position: relative;
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

// 베스트영화영상
// TODO 모달창 형태로 ifame띄우기
const BestVideo = ({ movies, scrollY }) => {
  const [video, setVideo] = useState({ data: null });
  useEffect(() => {
    setVideo({ data: movies });
  }, [movies, scrollY]);
  return (
    <BestPlay movies={movies}>
      <BestMainTitle>
        <BestMainTilteP>BEST PLAY</BestMainTilteP>
      </BestMainTitle>
      <BestMainBox>
        {video.data &&
          video.data.length > 0 &&
          video.data.slice(1, 4).map((movies, index) => {
            return index === 0 ? (
              <BestMainContainer>
                <MoviePoster></MoviePoster>
              </BestMainContainer>
            ) : (
              <BestSubContainer scrollY={scrollY}>
                <BestSubMovie>
                  <MoviePoster
                    key={movies.id}
                    id={movies.id}
                    bgUrl={movies.poster_path}
                  />
                </BestSubMovie>
              </BestSubContainer>
            );
          })}
      </BestMainBox>
    </BestPlay>
  );
};

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
  position: relative;
`;

const BestSubContainer = styled.section`
  width: 335px;
  height: 492px;
  position: absolute;
  top: 35px;
  margin-bottom: 10px;
  flex-direction: column;
  display: none;
  animation: ${fadeOut} 0.5s ease-out;
  ${(prop) => {
    if (prop.scrollY) return `display: block`;
  }};
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

const EventTitleSpan = styled.span`
  color: black;
  font-size: 45px;
  font-weight: 600;
`;

const EventImgs = styled.section`
  width: 1200px;
  margin: auto;
  visibility: ${(prop) => (prop.scrollY ? "visible" : "hidden")};
  /* &:visibility {
    animation: ${fadeOut} 1s ease-in-out;
  } */
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
