import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import MoviePoster from "Components/MoviePoster";
import { moviesApi } from "api";
import { Link } from "react-router-dom";

// TODO styled-component 컴포넌트화 만들기
// TODO CSS 추가 항목들
/*
ToDo 스크롤에 애니메이션, 슬라이드 이벤트

firstimg 
  양 사이드 넘김 버튼, 슬라이드 효과,자동으로 넘기기 
  밑에 현재 위치 표시 + 중지

Randking
  양 사이드 넘김 버튼, 슬라이드 효과

bestPlay
  스크롤 인 -> 사이드 3개 보이기
  사이드 hover -> 흐릿

Evnet
  스크롤 -> 진행중인 event 보이기
*/

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

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll); //메모리누수 방지
    };
  }, []);

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
  useEffect(() => {
    feactApi();
  }, []);

  return (
    <HomePage>
      {console.log(window.scrollY)}
      <MainPoster movies={movies.popular} />
      {/* 랭킹 */}
      <MoviesRanking movies={movies.popular} upComingMovies={upComingMovies} />
      {/* 베스트다운로드 */}
      <BestPlay>
        <BestMainTitle>
          <BestMainTilteP>BEST PLAY</BestMainTilteP>
        </BestMainTitle>
        <BestMainBox>
          <BestMainContainer>
            {/* //TODO 영상component로 변경 */}
            <MoviePoster></MoviePoster>
          </BestMainContainer>
          <BestSubContainer scrollY={position.BestPlay}>
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
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <NoticeInfoItem>
                <MoviePoster key={i}></MoviePoster>
              </NoticeInfoItem>
            ))}
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

  return (
    <>
      <FirstBgImg
        src={
          movies
            ? `https://image.tmdb.org/t/p/original${
                movies[onMouse.item].backdrop_path
              }`
            : require("../assets/noPosterSmall.png").default
        }
      />
      <FirstContext>
        <FirstImgInfo>
          <FirstImgInfoDetail>▶</FirstImgInfoDetail>
          <FirstImgName>
            {movies ? movies[onMouse.item].title : ""}
          </FirstImgName>
          <FirstImgRank>
            {movies
              ? `${onMouse.item + 1}위 ${movies[onMouse.item].vote_average}`
              : ""}
          </FirstImgRank>
        </FirstImgInfo>
        <FirstPosterContainer>
          <FirstPosters>
            {movies &&
              movies.length > 0 &&
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
  );
};

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
  justify-content: center;
  width: 100%;
  margin: auto;
  height: 650px;
  position: absolute;
  z-index: -1;
  animation: ${fadeOut} 1.5s;
`;

const FirstContext = styled.section`
  height: 650px;
  flex-direction: column;
  position: relative;
  &:hover {
    ${PrevBtn} {
      opacity: 0.7;
    }
    ${NextBtn} {
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

// 영화순위
const MoviesRanking = ({ movies, upComingMovies }) => {
  // nav 클릭시 바꿀 movies 데이터
  const NavList = ["RANKING", "BOXOFFICE", "COMING", "FESTIVAL"];
  const [onNav, setOnNav] = useState({
    data: null,
    navList: NavList[0],
  });

  //nav 클릭시 data바꿈
  const NavChange = (data, index) => {
    return setOnNav((onNav) => ({
      ...onNav,
      data,
      navList: NavList[index],
    }));
  };
  return (
    <>
      <Ranking>
        <RankingMenu>
          <RankingMenubgImg>{onNav.navList}</RankingMenubgImg>
          {/* //TODO component로 변경하기 */}
          <Rankingli
            onClick={() => NavChange(movies, 0)}
            current="RANKING"
            state={onNav.navList}
          >
            예매순위
          </Rankingli>
          <Rankingli
            onClick={() => NavChange(movies, 1)}
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
            onClick={() => NavChange(movies, 3)}
            current="FESTIVAL"
            state={onNav.navList}
          >
            영화제영화
          </Rankingli>
        </RankingMenu>
        {/* //TODO 슬라이드효과 */}
        {onNav.data ? (
          <RankingContainer>
            {onNav.data.length > 0 &&
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
            <Left />
            <Right />
            <PrevBtn>◀</PrevBtn>
            <NextBtn>▶</NextBtn>
          </RankingContainer>
        ) : (
          // 초기화면
          <RankingContainer>
            {movies &&
              movies.slice(0, 10).map((movies, index) => {
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
            <Left />
            <Right />
            <PrevBtn>◀</PrevBtn>
            <NextBtn>▶</NextBtn>
          </RankingContainer>
        )}
      </Ranking>
    </>
  );
};

// 랭크별
const Ranking = styled.div`
  padding: 50px 0 50px 0;
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
  min-width: 1200px;
  margin-top: 35;
  height: 370px;
  top: 280px;
  display: flex;
  gap: 20px;
  &:hover {
    ${PrevBtn} {
      opacity: 0.7;
    }
    ${NextBtn} {
      opacity: 0.7;
    }
  }
`;

const RankingSize = styled.div`
  position: relative;
  min-width: 256px;
  height: 372px;
  display: flex;
  justify-content: center;
  /* ${MoviePoster} {
    border: 10px solid red;
  } */
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

const Gradient = styled.div`
  width: 200px;
  height: 372px;
  position: absolute;
  z-index: 1;
`;

const Left = styled(Gradient)`
  left: 0;
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
const Right = styled(Gradient)`
  right: 0;
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
  display: none;
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
  visibility: hidden
    ${(prop) => {
      if (prop.scrollY) return `visibility:visible`;
    }};
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
const NoticeInfo = styled.section`
  margin: 60px 0;
  height: 75px;
`;

const NoticeInfoList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoticeInfoItem = styled.li`
  margin-right: 10px;
  width: 170px;
`;
