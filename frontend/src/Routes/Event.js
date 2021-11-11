import React, { useState } from "react";
import styled from "styled-components";
import { Button, Typography } from "@material-ui/core";

const Container = styled.div`
  width: 100%;
  height: 1041.650px;
  padding-top: 70px;
  background-color: white;
  flex-direction: column;
`;

const Event_banner = styled.div`
  width: 100%;
  height: 420px;
  background-color: #e17167;
  /* flex-direction: column; */
`;

// const Event_image = styled.img`
//   width : 1200px;
//   height : 420px;
// `;

const Event_inner = styled.div`
  width: 1200px;
  height: 621px;
  margin: auto;
  padding-bottom: 120px;
  background-color : #5b7ec3;
  /* flex-direction: column; */
`;

const Event_tab = styled.div`
  height : 137.76px;
  padding-top: 60px;
  background-color: whitesmoke;
`;

const Tab_box_container = styled.div`
  width: 300px;
  height: 77.76px;
  padding-top: 30px;
  display: inline-flexbox;
  justify-content: center;
  align-items: center;
  background-color: violet;
`;

const Tab_box = styled(Button)`
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

const All_event_list = styled.div`
  width : 1200px;
  height : 293.89px;
  background-color: black;
`;
const Event_link_box = styled.div`
    position: relative;
    margin: 0 0 30px 30px;
    display: inline-block;
    width: calc((100% - 60px) / 3);
    background-color: red;
`;

const Event_box = styled.div`
  /* position: absolute; */
  width: 380px;
  height: 263.89px;
  padding : 40px 40px 0;
  /* padding-top: 40px;
  padding-right: 40px;
  padding-left: 40px; */
  background-color: darkgrey;
`;

const Event = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container>
        <Event_banner>
          <p>여기에 메인 이벤트 이미지url첨부</p>
          {/* <Event_image>
            <img src = "https://movie-simg.yes24.com/NYes24//MgrMain//20/06/evthd_attend_090339.png"></img>
          </Event_image> */}
        </Event_banner>
        <Event_inner>
          <Event_tab>
            {[1,2,3,4].map((i)=>{
              return(
                <Tab_box_container>
                  <Tab_box>
                    <p>test</p>
                  </Tab_box>
                </Tab_box_container>
              );
            })}
          </Event_tab>
          <All_event_list>
            {[1, 2].map((i)=>{
              return(
              <Event_link_box>
                <Event_box>
                  <p>테스트</p>
                </Event_box>
              </Event_link_box>
              );
            })}
          </All_event_list>
        </Event_inner>
      </Container>
    </>
  );
};

// const SimpleDialog = ({, open}) => {};

export default Event;

