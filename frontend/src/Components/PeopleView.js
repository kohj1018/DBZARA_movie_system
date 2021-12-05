import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PeopleView = ({ id, name, job, src }) => {  
  return (
    <>
      <ActCont>
        <PeopleLink to={`MoviesInfo/People/${id}`}>
          <ActThumb>
            <ActImg src={src ? src : "https://movie-img.yes24.com/NYes24/new/ic_noimg02.png"}></ActImg>
          </ActThumb>
          <ActInfo>
            <Name>{name}</Name>
            <Job>{job}</Job>
          </ActInfo>
        </PeopleLink>
      </ActCont>
    </>
  );
};

export default PeopleView;


const ActCont = styled.div`
  margin: 30px 0 0 0 0;
  display: inline-block;
  width: 133px;
  vertical-align: top;
`;

const PeopleLink = styled(Link)`
  color: #2b2b2b;
  outline: none;
  cursor: pointer;
`;

const ActThumb = styled.div`
  margin: auto;
  width: 115px;
  height: 115px;
  text-align: center;
  border-radius: 50%;
  background: #e5e5e5;
  overflow: hidden;
`;

const ActImg = styled.img`
  width: 100%;
  text-align: center;
`;

const ActInfo = styled.div`
  margin-top: 15px;
  font-size: 14px;
  text-align: center;
`;

const Name = styled.p`
  font-size: 15px;
  color: #2b2b2b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Job = styled.p`
  padding-top: 7px;
  font-size: 12px;
  color: #777;
`;