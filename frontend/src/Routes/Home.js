import React from "react";
import styled from "styled-components";
import MoviePoster from "Components/MoviePoster";

// 베스트영상
const BestPlay = styled.section`
  padding: 60px 0 150px 0;
  width: 100%;
  height: 750px;
  flex-direction: column;
  background-color: #6f86d6;
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
  background-color: #e2ebf0;
  flex-direction: column;
`;

const BestSubMovie = styled.section`
  width: 100%;
  height: 33%;
  margin-bottom: 10px;
  background-color: #e2ebf0;
`;

//이벤트
const Event = styled.section`
  padding-bottom: 60px;
  width: 100%;
  height: 750px;
  background-color: #fad0c4;
`;

const Home = () => (
  <HomePage>
    <FirstImg>
      <FirstPosterContainer>
        <p>영화포스터</p>
        {/* TODO api로 data받아오기  */}
        <FirstPosters>
          {[1, 2, 3, 4, 5].map((i) => {
            return (
              <FirstSize>
                <MoviePoster>i</MoviePoster>
              </FirstSize>
            );
          })}
        </FirstPosters>
      </FirstPosterContainer>
    </FirstImg>
    <Ranking>
      <RankingMenu>
        {/* TODO nav만들기 */}
        <p>예매순위</p>
        <p>박스 오피스</p>
        <p>개봉예정작</p>
        <p>영화제영화</p>
      </RankingMenu>
      <RankingContainer>
        {/* TODO 1,7번째 흐리게 && 양 사이드 흐리게*/}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
          return (
            <RankingSize>
              <MoviePoster>1</MoviePoster>
            </RankingSize>
          );
        })}
      </RankingContainer>
    </Ranking>
    <BestPlay>
      <BestMainTitle>
        <p>BEST PLAY</p>
      </BestMainTitle>
      <BestMainBox>
        <BestMainContainer>
          {/* TODO 영화component로 변경 */}
          <MoviePoster></MoviePoster>
        </BestMainContainer>
        <BestSubContainer>
          {[1, 2, 3].map((i) => {
            return (
              <BestSubMovie>
                <MoviePoster>i</MoviePoster>
              </BestSubMovie>
            );
          })}
        </BestSubContainer>
      </BestMainBox>
    </BestPlay>
    <Event>
      <p>Event</p>
    </Event>
  </HomePage>
);

export default Home;

const HomePage = styled.div`
  overflow-x: hidden;
`;

// 추천 영화
const FirstImg = styled.div`
  width: 100%;
  height: 650px;
  background-color: #ff7eb3;
`;
const FirstPosterContainer = styled.section`
  height: 370px;
  top: 280px;
  position: relative;
  background-color: #764ba2;
  flex-direction: column;
  opacity: 0.8;
`;
const FirstSize = styled.div`
  margin: 0 5px 0 5px;
  width: 130px;
  height: 180px;
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
  width: 100%;
  height: 600px;
  background-color: #66a6ff;
`;
const RankingMenu = styled.section`
  height: 92px;
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
