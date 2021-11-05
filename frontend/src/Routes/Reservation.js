import React from "react";
import styled from "styled-components";
import MoviePoster from "Components/MoviePoster";

const Container = styled.div`
  margin-top: 50px;
  padding: 15px;
  color: blue;
  display: grid;
`;

const Reservation = () => (
  <>
    <Container>
      <MoviePoster number={1} />
      <MoviePoster number={2} />
    </Container>
  </>
);

export default Reservation;
