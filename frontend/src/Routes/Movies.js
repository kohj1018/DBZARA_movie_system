import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MovieView from "Components/MovieView";
import movieData from "movieData";
import { dbzaraApi } from "dbzaraapi";

const Movies = () => {
  const [ movies, setMovies ] = useState();
  const getMovie = async () => {
    const { data: {results: movies} } = await dbzaraApi.boxOffice();
    setMovies(() => movies);
    console.log(movies);
  }

  useEffect(() => {
    getMovie();
  }, [])
  return (
    movies ? (
  <>
    <Container>
      <MovieRankCont>
        {movies.map((movie, idx) => {
          return (
            <MovieView 
              id={idx}
              rank={movie.idx}
              src={movie.poster}
              age={12}
              title={movie.name}
              ticketSales={movie.reservation_rate}
              rates={0}
              // id={idx}
              // rank={movie.idx}
              // src={movie.poster}
              // age={12}
              // title={movie.name}
              // ticketSales={movie.reservation_rate}
              // rates={0}
              // id={movie.id}
              // rank={movie.rank}
              // src={movie.src}
              // age={movie.age}
              // title={movie.title}
              // ticketSales={movie.ticketSales}
              // rates={movie.rates}
              // {...movie}
            />
          )
        })}
      </MovieRankCont>
    </Container>
  </>
    ) : <div></div>
)};

export default Movies;


const Container = styled.div`
  margin: 150px auto 200px;
  width: 1200px
`;

const MovieRankCont = styled.div`
  display: grid;
  grid-template-columns: 275.5px 275.5px 275.5px 275.5px;
  gap: 50px 30px;
`;