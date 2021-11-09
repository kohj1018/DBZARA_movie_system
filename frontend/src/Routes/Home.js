import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import MoviePoster from "Components/MoviePoster";
import { moviesApi } from "api";

/*
TODO

css추가sS

firstimg 
  컨테이너 hover -> 양 사이드 넘김 버튼 
  컴포넌트 hovet -> 뒤집히는 효과, 중간에 제목, 순위, %띄우기 && 
  자동으로 넘기기 
  밑에 현재 위치 표시 + 중지

Randking
  뒤에 현재 어디인지 보이기
  nav만들기
  1,7번째 poster 흐릿
  view기준 양 사이드 흐릿
  양 사이드 넘김 버튼

bestPlay
  스크롤 -> 사이드 3개 보이기
  사이드 hover -> 흐릿

Evnet
  스크롤 -> 진행중인 event 보이기

*/

// TODO MoviePoster hover시  FirstImg baUrl변경 실패 ㅅㅂ
// TODO styled-component 컴포넌트화 만들기

const Home = () => {
  let [movies, setMovies] = useState({
    popular: null,
    error: null,
    loading: true,
  });

  async function feactApi() {
    try {
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      // console.log(data);
      setMovies((movies) => ({ ...movies, popular }));
      // console.log(popular);
    } catch {
      setMovies((movies) => ({
        ...movies,
        error: "영화 정보를 찾을 수 없습니다!",
      }));
    } finally {
      setMovies((movies) => ({ ...movies, loading: false }));
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

  return (
    <HomePage>
      {/* 메인 배너 */}
      {/* {console.log(`test: ${movies.popular}`)} */}
      {/* {console.log(`test: ${movies.popular[onMouse.item].backdrop_path}`)} */}
      <FirstImg>
        <FirstPosterContainer>
          <FirstPosters>
            {movies.popular &&
              movies.popular.length > 0 &&
              movies.popular.slice(0, 5).map((movies, index) => {
                return (
                  // TODO 아래 코드로 하면 리렌더가 너무 많다고 에러뜸 => 호버로 만들기
                  <FirstSize onMouseOver={() => handleHover(index)}>
                    {console.log(onMouse)}
                    {/* <FirstSize> */}
                    {/* // TODO 애니메이션 왜 안먹힘? */}
                    <TurnYPoster>
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
      </FirstImg>
      {/* 랭킹 */}
      <Ranking>
        <RankingMenu>
          {/* //TODO nav만들기 */}
          {["예매순위", "박스오피스", "개봉예정작", "영화제영화"].map((i) => {
            return <Rankingli>{i}</Rankingli>;
          })}
        </RankingMenu>
        <RankingContainer>
          {/* //TODO 1,7번째 흐리게 && 양 사이드 흐리게*/}
          {movies.popular &&
            movies.popular.length > 0 &&
            movies.popular.slice(0, 10).map((movies, index) => {
              return (
                <RankingSize>
                  <MoviePoster
                    key={movies.id}
                    id={movies.id}
                    bgUrl={movies.poster_path}
                    index={index + 1}
                  ></MoviePoster>
                </RankingSize>
              );
            })}
        </RankingContainer>
      </Ranking>
      {/* 베스트다운로드 */}
      <BestPlay>
        <BestMainTitle>
          <p>BEST PLAY</p>
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
            <p>공지사항</p>
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

// 추천 영화
const FirstImg = styled.div`
  height: 650px;
  background-color: #64b5f6;
`;
const FirstPosterContainer = styled.section`
  height: 370px;
  top: 280px;
  position: relative;
  background-color: #2286c3;
  flex-direction: column;
`;

const FirstSize = styled.div`
  margin: 0 5px 0 5px;
  width: 130px;
  height: 180px;
`;

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
  animation: ${turnY} 0.5s ease-in-out; // TODO 아니 왜 안돼?
  &:hover {
    transform: rotateY(180deg);
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

  height: 600px;
  background-color: #9be7ff;
`;
const RankingMenu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 92px;
`;
const Rankingli = styled.li`
  margin-right: 30px;
`;
const RankingContainer = styled.div`
  min-width: 1200px;
  margin-top: 35;
  height: 370px;
  top: 280px;
  display: flex;
  /* border: 2px solid red; */
`;

const RankingSize = styled.div`
  margin-right: 20px;
  min-width: 256px;
  height: 372px;
`;

// 베스트영상
const BestPlay = styled.section`
  padding: 60px 0 150px 0;
  width: 100%;
  height: 750px;
  flex-direction: column;
  background-color: #90caf9;
`;

const BestMainTitle = styled.section`
  min-width: 1200px;
  height: 40px;
  /* border: 1px solid red; */
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
  background-color: #5d99c6;
  flex-direction: column;
`;

const BestSubMovie = styled.section`
  width: 100%;
  height: 33%;
  margin-bottom: 10px;
  background-color: #c3fdff;
`;

//이벤트
const Event = styled.section`
  padding-bottom: 60px;
  height: 520px;
  flex-direction: column;
  background-color: #bbdefb;
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
  background-color: #edffff;
`;

// 공지사항
const Notice = styled.section`
  margin: 60px 0 70px 0;

  background-color: #81b9bf;
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
`;
const NoticeTitleItem = styled.p`
  margin-left: 10px;
  font-size: 20px;
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
