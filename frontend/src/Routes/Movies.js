import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MovieView from "Components/MovieView";
import movieData from "movieData";
import { dbzaraApi } from "dbzaraApi";

const Movies = () => {
  // const [movies, setMovies] = useState();
  // const getMovie = async () => {
  //   const { data: { results: movies } } = await dbzaraApi.boxOffice();
  //   setMovies(() => movies);
  // }

  // useEffect(() => {
  //   getMovie();
  // }, [])

  return (
    <>
      <Container>
        <MovieRankCont>
          {movieData.map((movie) => {
            return (
              <MovieView
                // id={movie.id}
                // rank={movie.rank}
                // src={movie.src}
                // age={movie.age}
                // title={movie.title}
                // ticketSales={movie.ticketSales}
                // rates={movie.rates}
                {...movie}
              />
            );
          })}
        </MovieRankCont>
      </Container>
    </>
  );
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
