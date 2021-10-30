import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const Container = styled.div`
  width: 150px;
  height: 100px;
  background-color: RGB(254, 249, 220);
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const Item = styled.div`
  position: relative;
  top: 50px;
  left: 100px;
  font-size: 10px;
  color: RGB(0, 174, 224);
`;

const Btn = styled(Button)`
  && {
    width: 10px;
    position: relative;
    top: 40px;
    left: 80px;
    font-size: 10px;
    color: RGB(0, 174, 224);
  }
`;

const MoviePoster = ({ number }) => {
  const [like, setLike] = useState(10);

  return (
    <>
      <Container>
        <div>movie{number}</div>
        <Btn onClick={() => setLike(like + 1)}>좋아요{like}</Btn>
      </Container>
    </>
  );
};

export default MoviePoster;
