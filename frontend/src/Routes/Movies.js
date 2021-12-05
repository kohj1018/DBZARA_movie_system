import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MovieView from "Components/MovieView";
import movieData from "movieData";
import { dbzaraApi } from "dbzaraApi";
import PeopleView from "Components/PeopleView";
import { CircularProgress } from "@material-ui/core";

const Movies = () => {
  const [movies, setMovies] = useState();
  const getMovie = async () => {
    const {
      data: { results: movies },
    } = await dbzaraApi.boxOffice();
    setMovies(() => movies);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    movies ? (
      <>
        <Container>
          {/* <PeopleView
            id={0}
            name={"임지연"}
            job={"배우"}
            src={"https://movie-simg.yes24.com/NYes24//PER_PHOTO//14/09/Lim_jiyeon_112010.jpg"}
          /> */}
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
            <Btn>더보기</Btn>
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

export default Movies;

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