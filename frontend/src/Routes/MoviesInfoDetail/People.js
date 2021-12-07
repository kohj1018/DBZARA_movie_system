import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PeopleView from "Components/PeopleView";
import movieData from "movieData";
import { CircularProgress } from "@material-ui/core";
import { dbzaraApi } from "dbzaraApi";

const People = ({ id }) => {
  const [moviePeople, setMoviePeople] = useState();

  const getMoviePeople = async () => {
    const { data: { actors: moviePeople } } = await dbzaraApi.moviePeople(id);
    setMoviePeople(() => moviePeople);
  }

  useEffect(() => {
    getMoviePeople();
  }, [])

  // const directorList = movieData[id].people.filter(people =>
  //   people.job != "배우"
  // );
  // const actorList = movieData[id].people.filter(people =>
  //   people.job == "배우"
  // );
  return (
    moviePeople ? (
      <>
        <Container>
          <Title>배우·제작진</Title>
          <ActArea>
            {moviePeople.map(people => {
              return (
                <PeopleView
                  id={people.actor.id}
                  name={people.actor.name}
                  job={"배우"}
                  src={people.actor.image}
                />
              )
            })}
          </ActArea>
          {/* <ActArea>
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
          </ActArea> */}
        </Container>
      </>
    ) : (
      <>
        <LoadingArea>
          <CircularProgress />
        </LoadingArea>
      </>
    )
  )
};

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

const LoadingArea = styled.div`
  margin: 400px auto 300px;
  width: 1200px;
  text-align: center;
`;