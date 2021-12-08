import React from "react";
import styled from "styled-components";
import PeopleView from "Components/PeopleView";
// import MoviewView from "Components/MovieView"
import movieData from "movieData";

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



const PreferActor = ({ actorList }) => {
  return (
    <>
      <Container>
        <ActArea>
          {actorList.map(people => {
            return (
              <PeopleView
                  id={people.id}
                  key={people.id}
                  name={people.name}
                  src={people.image}
              />
            )
          })}
        </ActArea>
      </Container>
    </>
  )
};

export default PreferActor;

