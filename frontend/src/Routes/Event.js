import React, { useState } from "react";
import styled from "styled-components";
import { Button, Typography } from "@material-ui/core";
import EventPoster from "Components/EventPoster";
// import { Tab } from '@mui/material-ui/core/Tab';


const Container = styled.div`
  width: 100%;
  height: 1041.650px;
  padding-top: 70px;
  background-color: white;
  flex-direction: column;
`;

const EventBanner = styled.div`
  width: 100%;
  height: 420px;
  background-color: #6185CF;
  /* flex-direction: column; */
`;

const Event_image = styled.div`
  width : 1200px;
  height : 420px;
  display: block;
  margin: auto; 
  ::after{
    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.3));
  }
`;

const EventInner = styled.div`
  padding: 0 0 120px;
  margin: 0 105px 0 105px;
  width: 1200px;
  height: 621.875px;
  margin:auto;
`;

const EventTab = styled.div`
  height : 138px;
  padding-top: 60px;
`;
const TabMenu = styled.ul`
  display: table;
  table-layout: fixed;
  width: 100%;
  margin-bottom: 70px;
  position: relative;
  /* list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px; */
`;

const TabBoxContainer = styled.li`
  width: 300px;
  height: 77.76px;
  padding-top: 30px;
  display: table-cell;
  text-align: center;
  padding-bottom:2px;
  border-bottom:1px solid #b4b4b4;
  :active{
    border-bottom: 3px solid #2b2b2b;
  }
`;

const TabBox = styled(Button)`
  && {
    padding-bottom: 28px;
    display: inline-block;
    vertical-align: top;
    font-size: 17px;
  }
`;

const AllEventList = styled.div`
  display: block;
  width : 1200px;
  height : 293.89px;
  margin-top: 60px;
  position: relative;
  *{        //*의 의미 - 이 태그의 자식들은 모두 이 속성을 따라갈 것이다
    box-sizing: border-box;
  }
`;
const EventLinkBox = styled.div`
    position: relative;
    margin: 0 0 10px 10px;
    display: inline-block;
    width: calc((100% - 60px) / 3);
`;

// const EventBox = styled.div`
//   /* position: absolute; */
//   width: 380px;
//   height: 263.89px;
//   padding : 40px 40px 0;
//   /* padding-top: 40px;
//   padding-right: 40px;
//   padding-left: 40px; */
//   background-color: darkgrey;
//   &:hover {
//     opacity: 0.75;
//   }

// `;

const Event = () => {
  const [tabClick, setTabClick] = useState(0);



  return (
    <>
      <Container>
        <EventBanner>
          <Event_image>
            <a href="https://movie.yes24.com/Event/EventDetail?eventId=100308">
              <img src="https://movie-simg.yes24.com/NYes24//MgrMain//20/06/evthd_attend_090339.png"></img>
            </a>
          </Event_image>
        </EventBanner>
        <EventInner>
          <EventTab>
            {/*
            {[0,1,2,3].map((i)=>{
              return(
                <TabBoxContainer>
                  <TabBox>
                    test
                  </TabBox>
                </TabBoxContainer>
              );
            })}
          */}
            <TabMenu>
              <TabBoxContainer>
                <TabBox onClick={() =>{setTabClick(0)}}> 전체 </TabBox>
              </TabBoxContainer>
              <TabBoxContainer>
                <TabBox onClick={() =>{setTabClick(1)}}> 시사회 </TabBox>
              </TabBoxContainer>
              <TabBoxContainer>
                <TabBox onClick={() =>{setTabClick(2)}}> 이벤트 </TabBox>
              </TabBoxContainer>
              <TabBoxContainer>
                <a href="https://movie.yes24.com/Event/Winner" target="_blank">
                  <TabBox> 당첨자발표 </TabBox>
                </a>
              </TabBoxContainer>
            </TabMenu>
          </EventTab>
          <TabContent tabClick ={tabClick}/>

          {/* <AllEventList>
            {[1, 2].map((i)=>{
              return(
              <EventLinkBox>
                <EventBox>
                  <EventPoster></EventPoster>
                  <p>테스트</p>
                </EventBox>
              </EventLinkBox>
              );
            })}
          </AllEventList> */}
        </EventInner>
      </Container>
    </>
  );
};

const TabContent = (props) =>{
  if (props.tabClick === 0) {
    return (          
    <AllEventList>
      {[0, 1, 2].map((i)=>{
        return(
        <EventLinkBox>
            <img src="https://movie-simg.yes24.com/NYes24//EVENT_IMG/20/05/evtlist_attend_141625.png"
            style={{width:"100%", height:"100%", position:"relative"}}></img>
            <EventPoster>
              <div>
                <DDay>D - 46</DDay>
                <EventTitle>매일매일 출첵하고 혜택받자!</EventTitle>
                <EventText>예매권/할인권</EventText>
              </div>
            </EventPoster>
        </EventLinkBox>
        );
      })}
    </AllEventList>
)
  } else if (props.tabClick === 1){
    return (          
      <AllEventList>
        <NoneEvent>
          진행중인 시사회가 없습니다.
        </NoneEvent>
        {/* {[0, 1].map((i)=>{
          return(
          <EventLinkBox>
              <EventPoster><p>이벤트 image 넣을게여</p></EventPoster>
          </EventLinkBox>
          );
        })} */}
      </AllEventList>
  )
  } else if (props.tabClick === 2){
    return (          
      <AllEventList>
        {[2].map((i)=>{
          return(
          <EventLinkBox>
            <img src="https://movie-simg.yes24.com/NYes24//EVENT_IMG/20/05/evtlist_attend_141625.png"
            width="100%"height="100%"position="relative"></img>
              <EventPoster></EventPoster>
          </EventLinkBox>
          );
        })}
      </AllEventList>
  )
  } else if (props.tabClick === 3){
    return <div> 3 </div>
  }
}

const DDay = styled.div`
  padding-bottom: 15px;
  font-size: 28px;
  color: #ec6159;
  text-align: center;
`;

const EventTitle = styled.div`
  padding-bottom: 20px;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  vertical-align: baseline;
`;

const EventText = styled.div`
  padding-bottom: 10px;
`;

const NoneEvent = styled.div`
  color: #2b2b2b;
  text-align: center;
  font-size: 14px;
`;

export default Event;

