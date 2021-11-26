import React from "react";
import styled from "styled-components";
import { Box, Button } from "@material-ui/core";

const EventPoster = ({key, id, children}) => {
    return(
        <EventImg>
                    <Btn>
                        {children}
                        {/* <img src="https://movie-simg.yes24.com/NYes24//EVENT_IMG/20/05/evtlist_attend_141625.png"
                        width="100%"height="100%"position="absolute"></img> */}
                    </Btn>
        </EventImg>
    );
  };

export default EventPoster;

const EventImg = styled.div`
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
    opacity: 0.9;
  }
`;

// const Background = styled.div`
//   width: 380px;
//   height: 263.89px;
//   /* padding : 40px 40px 0; */
//   /* padding-top: 40px;
//   padding-right: 40px;
//   padding-left: 40px; */
//   background-color: #2b2b2b;
//   &:hover {
//     opacity: 0.1;
//   }
// `;

const Btn = styled(Button)`
  && {
    padding: 0%;
    width: 100%;
    height: 100%;
    position: relative;
    font-size: 16px;
    color: RGB(255, 255, 255);
  }
`;

