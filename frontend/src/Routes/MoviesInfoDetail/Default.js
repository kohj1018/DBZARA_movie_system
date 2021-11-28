import React from "react";
import styled from "styled-components";
import movieData from "movieData";
import PeopleView from "Components/PeopleView";
import People from "./People";

const Default = ({ match }) => (
  <>
    <Container>
      <Title>시놉시스</Title>
        {movieData[match.params.id].sysTxt.map(txt => {
          return (
            <Txt>
            {txt}
            </Txt>
          )
        })}
      <Title>제작정보</Title>
      <Txt>수입 : {movieData[match.params.id].studio}</Txt>
      <Txt>배급 : {movieData[match.params.id].distributor}</Txt>
      <Title>배우·제작진</Title>
      <ActArea>
        {movieData[match.params.id].people.map(people => {
          return (
            <PeopleView
              name={people.name}
              job={people.job}
              src={people.src}
            />
          )
        })}    
      </ActArea>
      <Title>동영상</Title>
      <VodArea>
        <Video 
          src={movieData[match.params.id].video} 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
        />
      </VodArea>
      <Title>포토</Title>

    </Container>
  </>
);

export default Default;


const Container = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  box-sizing: border-box;
  display: block;
  color: #777;
`;

const Title = styled.p`
  margin: 70px 0 20px;
  position: relative;
  font-size: 20px;
  color: #2b2b2b;
`;

const Txt = styled.p`
  line-height: 24px;
  font-size: 15px;
`;

const ActArea = styled.div`
  padding-top: 30px;
`;

const VodArea = styled.div`
  margin-top: 20px;
  position: relative;
  width: 100%;
  height: 660px;
  overflow: hidden;
  background: #000;
`;

const Video = styled.iframe`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const PhotoArea = styled.div`
  font-size: 0;
`;

const PhotoBig = styled.div`
  position: relative;
  display: block;
  box-sizing: border-box;
  user-select: none;
  touch-action: pan-y;
  
`;