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
  /* text-align: center; */
  display: block;
  margin: auto; 
`;

const EventInner = styled.div`
  width: 1200px;
  height: 621px;
  margin: auto;
  padding-bottom: 120px;
  /* background-color : #5b7ec3; */
  /* flex-direction: column; */
`;

const EventTab = styled.div`
  height : 137.76px;
  padding-top: 60px;
  background-color: whitesmoke;
`;
const TabMenu = styled.ul`
  display: table;
  table-layout: fixed;
  width: 100%;
  margin-bottom: 70px;
`;

const TabBoxContainer = styled.li`
  width: 300px;
  height: 77.76px;
  padding-top: 30px;
  display: inline-flexbox;
  justify-content: center;
  align-items: center;
  /* background-color: violet; */
`;

const TabBox = styled(Button)`
  && {
    /* margin: 2px 0 0 2px;
    width: 60%;
    height: 40px;
    position: relative;
    font-size: 10px;
    color: RGB(254, 249, 220);

    background-color: #00b09b; */
    padding-bottom: 28px;
    display: inline-block;
    vertical-align: top;
    font-size: 17px;
  }
`;

const AllEventList = styled.div`
  white-space: nowrap;
  width : 1200px;
  height : 293.89px;
  background-color: whitesmoke;
`;
const EventLinkBox = styled.div`
    position: relative;
    margin: 0 0 10px 10px;
    display: inline-block;
    width: calc((100% - 60px) / 3);
    background-color: rgb(200, 200, 200);
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
  const [open, setOpen] = useState(false);
  const [tabClick, setTabClick] = useState(0);



  return (
    <>
      <Container>
        <EventBanner>
          <Event_image>
            <img src="https://movie-simg.yes24.com/NYes24//MgrMain//20/06/evthd_attend_090339.png"></img>
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
                <TabBox
                  onClick={() =>{setTabClick(0)}}
                >
                  전체
                </TabBox>
                {/* <a href="javascript:fnShowMenu('ALLEVENT');">전체</a> */}
              </TabBoxContainer>
              <TabBoxContainer>
                <TabBox
                  onClick={() =>{setTabClick(1)}}
                >
                  시사회
                </TabBox>
              </TabBoxContainer>
              <TabBoxContainer>
                <TabBox
                  onClick={() =>{setTabClick(2)}}
                >
                  이벤트
                </TabBox>
              </TabBoxContainer>
              <TabBoxContainer>
                <TabBox
                  onClick={() =>{setTabClick(3)}}
                >
                  당첨자발표
                </TabBox>


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
            width="100%"height="100%"position="relation"></img>
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
        {[0, 1].map((i)=>{
          return(
          <EventLinkBox>
              <EventPoster><p>이벤트 image 넣을게여</p></EventPoster>
          </EventLinkBox>
          );
        })}
      </AllEventList>
  )
  } else if (props.tabClick === 2){
    return (          
      <AllEventList>
        {[2].map((i)=>{
          return(
          <EventLinkBox>
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
`;

const EventText = styled.div`
  padding-bottom: 10px;
`;

export default Event;

