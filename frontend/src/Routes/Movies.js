import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MovieView from "Components/MovieView";
import { dbzaraApi } from "dbzaraApi";
import { CircularProgress } from "@material-ui/core";
import { withRouter } from "react-router";

const Movies = ({ location }) => {

  // let showType = location.state.showType;
  let showType = "boxOffice"

  const [movies, setMovies] = useState();
  const [page, setPage] = useState(1);
  const getMovie = async () => {
    // Link로 들어온 props(showType)에 따라 어떤 걸 보여줄지 선택
    switch (showType) {
      case "nowPlaying":
        const {
          data: { results: moviesNowPlaying },
        } = await dbzaraApi.nowPlaying();
        setMovies((movies) => [...movies, moviesNowPlaying]);
        console.log("nowPlaying");
        break;
      case "notOpen":
        const {
          data: { results: moviesNotOpen },
        } = await dbzaraApi.notOpen();
        setMovies((movies) => [...movies, moviesNotOpen]);
        console.log("notOpen");
        break;
      default:
        // if 문 더보기 눌렀을 때 추가하는 거
        if (page < 2) {
          const {
            data: { results: moviesBoxOffice },
          } = await dbzaraApi.boxOffice1();
          setMovies(() => moviesBoxOffice);
          console.log("boxOffice");
        } else {
          const {
            data: { results: moviesBoxOffice },
          } = await dbzaraApi.boxOffice2();
          // useState의 set함수에 기존 배열 값에 concat()함수를 사용하면 내용이 추가됨.
          setMovies(movies.concat(moviesBoxOffice));
          console.log("boxOffice");
        }
        break;
    }
  };

  useEffect(() => {
    getMovie();
    console.log(page);
  }, [page]);

  const moreMovieData = () => {
    if (page < 2) {
      setPage(page + 1);
    } else {
      alert("더 이상 불러올 수 없습니다.")
    }
  }

  return (
    movies ? (
      <>
        <Container>
          <MovieRankCont>
            {movies.map(movie => {
              return (
                <MovieView
                  isFilmo={false}
                  id={movie.id}
                  rank={movie.reservation_rate}
                  src={movie.poster}
                  age={movie.grade}
                  title={movie.name}
                  ticketSales={0}
                  rates={0}
                // {...movie}
                />
              );
            })}
          </MovieRankCont>
          <BtnBottomArea>
            <Btn onClick={moreMovieData}>더보기</Btn>
          </BtnBottomArea>
        </Container>
      </>
    ) : (
      <>
        <LoadingArea>
          <CircularProgress />
        </LoadingArea>
      </>
    )
  )
};

export default withRouter(Movies);

const Container = styled.div`
  margin: 150px auto 200px;
  width: 1200px;
`;

const MovieRankCont = styled.div`
  display: grid;
  grid-template-columns: 275.5px 275.5px 275.5px 275.5px;
  gap: 50px 30px;
`;

const BtnBottomArea = styled.div`
  padding-top: 80px;
  text-align: center;
`;

const Btn = styled.button`
  font-size: 16px;
  padding: 20px 0 19px;
  min-width: 160px;
  line-height: 1;
  text-align: center;
  color: #2b2b2b;
  background: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
`;

const LoadingArea = styled.div`
  margin: 400px auto 300px;
  width: 1200px;
  text-align: center;
`;