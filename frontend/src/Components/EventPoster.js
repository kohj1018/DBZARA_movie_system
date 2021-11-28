import React from "react";
import styled from "styled-components";

const EventPoster = ({ key, id }) => {
  return (
    <>
      <EventBg src="https://movie-simg.yes24.com/NYes24//EVENT_IMG/20/05/evtlist_attend_141625.png"></EventBg>
      <EventInfo>
        <Btn>
          <DDay>D - 46</DDay>
          <EventTitle>매일매일 출첵하고 혜택받자!</EventTitle>
          <EventText>예매권/할인권</EventText>
        </Btn>
      </EventInfo>
    </>
  );
};

export default EventPoster;

const EventBg = styled.img`
  width: 100%;
  height: 100%;
  position: relative;
`;

const EventInfo = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  background-color: #000000;
  &:hover {
    opacity: 0.9;
  }
`;

const Btn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0%;
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 16px;
  color: RGB(255, 255, 255);
`;

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
