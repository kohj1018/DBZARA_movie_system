import React from "react";
import styled from "styled-components";
import { Box, Button } from "@material-ui/core";

const MoviePoster = ({ number }) => {
  return (
    <>
      <Container>
        <BtnContainer>
          <Btn>
            <p>예매</p>
          </Btn>
          <Btn>
            <p>정보</p>
          </Btn>
        </BtnContainer>
      </Container>
    </>
  );
};

export default MoviePoster;

const Container = styled(Box)`
  && {
    height: 100%;
    width: 100%;
    background-color: RGB(254, 249, 220);
    &:hover {
      opacity: 1;
      background-color: rgba(0, 150, 136, 1);
    }
  }
`;
const BtnContainer = styled.section`
  width: 100%;
  height: 100%;
  flex-direction: column;
  opacity: 0;
  &:hover {
    opacity: 1;
    background-color: rgba(0, 150, 136, 1);
  }
`;

const Btn = styled(Button)`
  && {
    margin: 2px 0 0 2px;
    width: 60%;
    height: 40px;
    position: relative;
    font-size: 10px;
    color: RGB(254, 249, 220);

    background-color: #00b09b;
  }
`;
