import React from "react";
import styled from "styled-components";
import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const MoviePoster = ({ key, id, bgUrl, index }) => {
  return (
    <>
      <MovieImg
        bgUrl={
          bgUrl
            ? `https://image.tmdb.org/t/p/w300${bgUrl}`
            : require("../assets/noPosterSmall.png").default
        }
      >
        <Index>{index}</Index>
        <Background>
          <Btn>
            {/* TODO 버튼 Link로 만들기 */}
            {/* <Link>예매</Link> */}
            <p>예매</p>
          </Btn>
          <Btn>
            {/* <Link>정보</Link> */}
            <p>정보</p>
          </Btn>
        </Background>
      </MovieImg>
    </>
  );
};

export default MoviePoster;
const MovieImg = styled(Box)`
  && {
    height: 100%;
    width: 100%;
    background-image: url(${(props) => props.bgUrl});
    background-size: cover;
    background-position: center;
  }
`;
const Index = styled.div`
  z-index: 1;
  width: 40px;
  height: 35px;
  position: absolute;
  opacity: 0.7;
  background-color: #0f0c29;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Background = styled.section`
  width: 100%;
  height: 100%;
  flex-direction: column;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  background-color: #000000;
  &:hover {
    opacity: 0.75;
  }
`;

const Btn = styled(Button)`
  && {
    margin: 3px 0;
    width: 60%;
    height: 40px;
    position: relative;
    font-size: 16px;
    color: RGB(254, 249, 220);
    border: 1px solid RGB(254, 249, 220);
    &:hover {
      border: 1px solid red;
      color: red;
    }
  }
`;
