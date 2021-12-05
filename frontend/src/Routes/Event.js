import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Typography } from "@material-ui/core";
import EventPoster from "Components/EventPoster";
import { BorderBottom } from "@material-ui/icons";
// import { Tab } from '@mui/material-ui/core/Tab';
import EventData from "EventData";
import axios from 'axios';


const Container = styled.div`
  width: 100%;
  height: 100%;
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
 
`;

const TabBoxContainerActive = styled.li`
  width: 300px;
  height: 77.76px;
  padding-top: 30px;
  display: table-cell;
  text-align: center;
  padding-bottom:2px;
  border-bottom: 3px solid #2b2b2b;
 
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width : 1200px;
  margin-top: 60px;
  gap: 15px;
  position: relative;
  *{        //*의 의미 - 이 태그의 자식들은 모두 이 속성을 따라갈 것이다
    box-sizing: border-box;
  }
`;
const EventLinkBox = styled.div`
    position: relative;
    margin: 0 0 10px 10px;
    display: flex;
    width: 100%;
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



  // window.test = event;


  return (
    <>
      <Container>
        {/* {test.map(())} */}
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
              {tabClick === 0 ? (
                <TabBoxContainerActive>
                  <TabBox onClick={() => {
                    setTabClick(0)
                  }}> 전체 </TabBox>
                </TabBoxContainerActive>
              ) : (
                  <TabBoxContainer>
                    <TabBox onClick={() => {
                      setTabClick(0)
                    }}> 전체 </TabBox>
                  </TabBoxContainer>
                )}
              {tabClick === 10 ? (
                <TabBoxContainerActive>
                  <TabBox onClick={() => {
                    setTabClick(10)
                  }}> 시사회 </TabBox>
                </TabBoxContainerActive>
              ) : (
                  <TabBoxContainer>
                    <TabBox onClick={() => {
                      setTabClick(10)
                    }}> 시사회 </TabBox>
                  </TabBoxContainer>
                )}
              {tabClick === 2 ? (
                <TabBoxContainerActive>
                  <TabBox onClick={() => {
                    setTabClick(2)
                  }}> 이벤트 </TabBox>
                </TabBoxContainerActive>
              ) : (
                  <TabBoxContainer>
                    <TabBox onClick={() => {
                      setTabClick(2)
                    }}> 이벤트 </TabBox>
                  </TabBoxContainer>
                )}
              <TabBoxContainer>
                <a href="https://movie.yes24.com/Event/Winner" target="_blank">
                  <TabBox> 당첨자발표 </TabBox>
                </a>
              </TabBoxContainer>
              {/* {tabClick === 3 ? (
                <TabBoxContainerActive>
                       <TabBox onClick={() => {
                      setTabClick(3)
                    }}> 당첨자발표 </TabBox>
                  <a href="https://movie.yes24.com/Event/Winner" target="_blank">
                    당첨자발표
                  </a>
                </TabBoxContainerActive>
              ) : (
                  <TabBoxContainer>
                    <TabBox onClick={() => {
                      <a href="https://movie.yes24.com/Event/Winner" target="_blank">
                        <TabBox> 당첨자발표 </TabBox>
                      </a>

                    }}> 당첨자발표 </TabBox>
                  </TabBoxContainer>
                )} */}

              {/* 
              <TabBoxContainer>
                <TabBox onClick={() => { setTabClick(1) }}> 시사회 </TabBox>
              </TabBoxContainer>
              <TabBoxContainer>
                <TabBox onClick={() => { setTabClick(2) }}> 이벤트 </TabBox>
              </TabBoxContainer>
              <TabBoxContainer>
                <a href="https://movie.yes24.com/Event/Winner" target="_blank">
                  <TabBox> 당첨자발표 </TabBox>
                </a>
              </TabBoxContainer> */}
            </TabMenu>
          </EventTab>
          <TabContent tabClick={tabClick} />

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

const TabContent = (props) => {

  const [event, setEvent] = useState([]);

  useEffect(() => {
    axios.get("http://dbzara.kro.kr/api/v1/event/") //api주소에서 받아오고
      .then((res) => {
        console.log(res.data.results)//그러고나서 받아온 데이터들을 res라는 변수에 저장하고 그걸 useState로 저장
        setEvent(res.data.results);
      }

      )
      .catch((err) => console.log(err)) //err메세지 뜨게 하게끔
  }, [])
  const tab = ['전체', '시사회', '이벤트', '당첨자발표'];

  return (
    tab.map((data, idx) => {
      if (props.tabClick === idx) { // tabclikc은 0,1,2,3 idx 는 const tab의 idx
        return (
          <AllEventList>
            {
              event.map((res, index) => {
                return (
                  <EventLinkBox>
                    <EventPoster
                      src={res.backdrop}
                      id={res.id}
                      day={res.remain_date}
                      title={res.title}
                    />
                    {/* {console.log(res)} */}
                  </EventLinkBox>
                )
              })
            }
          </AllEventList >
        );

      }
      // else if (props.tabClick === 10) {
      //   return (
      //     <NoneEvent>진행중인 시사화가 없습니다.</NoneEvent>
      //   )

      // }
    })
  );

  // if (props.tabClick === 0) {
  //   return (
  //     <AllEventList>
  //       {EventData.map(event => {

  //       })}
  //     </AllEventList>
  //   );
  // } else if (props.tabClick === 1) {
  //   return (
  //     <AllEventList>

  //       {/* {EventData.map((i)=>{
  //         return(
  //         <EventLinkBox>
  //             <EventPoster><p>이벤트 image 넣을게여</p></EventPoster>
  //         </EventLinkBox>
  //         );
  //       })} */}
  //     </AllEventList>
  //   );
  // } else if (props.tabClick === 2) {
  //   return (
  //     <AllEventList>
  //       {[1, 2, 3].map((i) => {
  //         return (
  //           <EventLinkBox>
  //             <EventPoster id={i}></EventPoster>
  //           </EventLinkBox>
  //         );
  //       })}
  //     </AllEventList>
  //   );
  // } else if (props.tabClick === 3) {
  //   return <div> 3 </div>;
  // }
};

// const NoneEvent = styled.div`
//   color: #2b2b2b;
//   text-align: center;
//   font-size: 14px;
//   grid-row-start: 1;
//   grid-column-start: 2;
// `;

export default Event;
