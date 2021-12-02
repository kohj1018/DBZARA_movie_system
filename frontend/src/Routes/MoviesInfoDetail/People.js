import React from "react";
import styled from "styled-components";
import PeopleView from "Components/PeopleView";
import movieData from "movieData";

const People = ({ id }) => {
  const directorList = movieData[id].people.filter(people =>
    people.job != "배우"
  );
  const actorList = movieData[id].people.filter(people =>
    people.job == "배우"
  );
  return (
  <>
    <Container>
      <Title>배우·제작진</Title>
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
      <ActArea>
        {actorList.map(people => {
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
)};

export default People;


const Container = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 0;
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

const ActArea = styled.div`
  padding-top: 30px;
`;