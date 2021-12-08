import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MovieView from "Components/MovieView";
import { dbzaraApi } from "dbzaraApi";
import { CircularProgress } from "@material-ui/core";

const MoviesRating = () => {

  const [movies, setMovies] = useState();
  const [page, setPage] = useState(1);
  const getMovie = async () => {
    if (page === 1) {
      const {
        data: { results: moviesReviewRating },
      } = await dbzaraApi.reviewRating(page);
      setMovies(() => moviesReviewRating);
    } else {
      const {
        data: { results: moviesReviewRating },
      } = await dbzaraApi.reviewRating(page);
      // useState의 set함수에 기존 배열 값에 concat()함수를 사용하면 내용이 추가됨.
      setMovies(movies.concat(moviesReviewRating));
    }
    console.log("moviesRating");
  }

  useEffect(() => {
    getMovie();
    console.log(page);
  }, [page]);

  const moreMovieData = () => {
    if (page < 3) {
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

export default MoviesRating;

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