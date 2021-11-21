import React from "react";
import styled from "styled-components";
import { Box, Button } from "@material-ui/core";
//todo 푸터 공지사항 만들기
const EventPoster = ({key, id, children}) => {
    return(
        <EventImg>
            <Background>
                    <Btn>
                        {children}
                        {/* <img src="https://movie-simg.yes24.com/NYes24//EVENT_IMG/20/05/evtlist_attend_141625.png"
                        width="100%"height="100%"position="absolute"></img> */}
                    </Btn>
            </Background>
        </EventImg>
    );
  };

export default EventPoster;

const EventImg = styled.section`
  position: absolute;
  top: 0;
  z-index: 1;
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
    /* margin: 3px; */
    width: 100%;
    height: 100%;
    position: relative;
    font-size: 16px;
    color: RGB(255, 255, 255);
    border: 1px solid RGB(255, 255, 255);
    /* &:hover {
      border: 1px solid red;
      /* color: red; */
    } */
  }
`;

const Background = styled.section`
  width: 380px;
  height: 263.89px;
  /* padding : 40px 40px 0; */
  /* padding-top: 40px;
  padding-right: 40px;
  padding-left: 40px; */
  background-color: darkgrey;
  &:hover {
    opacity: 0.75;
  }
`;
