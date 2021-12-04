import React from "react";
import styled from "styled-components";
import PeopleView from "Components/PeopleView";
import movieData from "movieData";


const Container = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 0;
  /* vertical-align: baseline; */
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

const ActArea = styled.div`
  padding-top: 30px;
`;


const PreferDirector = ({ id }) => {
  const LatestTitle = movieData[0].title
  const directorList = movieData[0].people.filter(people =>
    people.job !== "배우"
  );
  return (
    <>
      <Container>
        <Title>4점 이상의 평점을 부여한 영화목록
          <li style={{ fontSize: "17px", color: "#2b2b2b", padding: "10px 0 0 10px" }}> {LatestTitle} </li>
        </Title>
        <p style={{ color: "2b2b2b", fontSize: "15px", paddingTop: "40px" }}>{LatestTitle} 감독 정보</p>
        <ActArea>
          {directorList.map(people => {
            return (
              <PeopleView
                // name={people.name}
                // job={people.job}
                // src={people.src}
                {...people}
              />
            )
          })}
        </ActArea>
      </Container>
    </>
  )
};

export default PreferDirector;