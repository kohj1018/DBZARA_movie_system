import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MovieView from "Components/MovieView";
// import movieData from "movieData";
import { dbzaraApi } from "jaehunApi";

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

  return movies ? (
    <>
      <Container>
        <MovieRankCont>
          {movies.map((movie) => {
            return (
              <MovieView
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
      </Container>
    </>
  ) : (
    <div></div>
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
