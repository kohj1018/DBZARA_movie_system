import React from "react";
import styled from "styled-components";
import MoviePoster from "Components/MoviePoster";

const Container = styled.div`
  margin-top: 50px;
  padding: 15px;
  color: blue;
  display: grid;
`;

const Popcorn = () => (
  <>
    <Container>
      <MoviePoster number={1} />
    </Container>
  </>
);

export default Popcorn;
