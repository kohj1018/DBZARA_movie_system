import React, { useState } from "react";
import styled from "styled-components";
import MovieSeat from "Components/MovieSeat";

// 좌석배정
const SeatReservation = ({
  display,
  onMovieSeat,
  theaterChoice,
  dayChoice,
}) => {
  const [selected, setSelected] = useState([]);

  //  ! 인원수
  // const [count, setCount] = useState({
  //   adult: {
  //     type: "abult",
  //     cnt: 0,
  //   },
  //   teenager: {
  //     type: "teenager",
  //     cnt: 0,
  //   },
  //   preferential: {
  //     type: "preferential",
  //     cnt: 0,
  //   },
  // });

  const [adultNum, setAdultNum] = useState({
    type: "adult",
    count: 0,
  });
  const [teenagerNum, setTeenagerNum] = useState({
    type: "teenager",
    count: 0,
  });
  const [preferentialNum, setPreferentialNum] = useState({
    type: "preferential",
    count: 0,
  });
  return (
    <Container display={display} current={3}>
      <p>인원/좌석 선택</p>
      <SeatPick>
        <SeatInfo>
          <div className={"PersonnelContainer"}>
            {/* {["성인", "청소년", "우대"].map((type, idx) => (
              <div>
                <p>{type}</p>
                <PersonCount
                  number={count}
                  setNumber={setCount}
                />
              </div>
            ))} */}
            <div>
              <p>성인</p>
              <PersonCount
                name={adultNum.type}
                number={adultNum}
                setNumber={setAdultNum}
              />
            </div>
            <div>
              <p>청소년</p>
              <PersonCount
                name={teenagerNum.type}
                number={teenagerNum}
                setNumber={setTeenagerNum}
              />
            </div>
            <div>
              <p>우대</p>
              <PersonCount
                name={preferentialNum.type}
                number={preferentialNum}
                setNumber={setPreferentialNum}
              />
            </div>
            {/* {console.log(adultNum)}
            {console.log(teenagerNum)}
            {console.log(preferentialNum)} */}
          </div>
          <div className={"TheaterContainer"}>
            <p>선택한 상영관 및 시간</p>
            <p>{theaterChoice ? theaterChoice.theater : "장소"}</p>
            <p>{dayChoice ? dayChoice.day : "시간"}</p>
          </div>
          <div className={"SeatContainer"}>
            <p>선택한 좌석</p>
            <p>{selected ? selected : "좌석을 선택 해 주세요."}</p>
          </div>
        </SeatInfo>
        <MovieSeat setSelected={setSelected} onMovieSeat={onMovieSeat} />
      </SeatPick>
    </Container>
  );
};

export default SeatReservation;

const PersonCount = ({ name, number, setNumber }) => {
  return (
    <CountBox number={number}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num, idx) => (
        <button
          onClick={() => setNumber((data) => ({ ...data, count: idx }))}
          className={name}
        >
          {idx}
        </button>
      ))}
    </CountBox>
  );
};

const Container = styled.div`
  display: ${(props) => (props.display === props.current ? "block" : "none")};
  width: 1200px;
  margin: auto;
  color: black;
  > div {
    margin: 20px 0;
  }
  > p {
    margin-bottom: 20px;
    font-size: 18px;
  }
`;

const SeatInfo = styled.div`
  margin: 50px;
  display: grid;
  grid-template-columns: 409px 350px 220px;
  font-size: 20px;
  font-weight: bold;
  .PersonnelContainer {
    > div {
      display: flex;
      > p {
        width: 120px;
      }
      > span {
        display: inline-block;
        height: 30px;
        vertical-align: top;
        > button {
          position: relative;
          margin-left: -1px;
          width: 30px;
          height: 30px;
          font-size: 15px;
          font-weight: normal;
          color: #777;
          text-align: center;
          border: 1px solid #e5e5e5;
          vertical-align: top;
          z-index: 1;
          cursor: pointer;
          background-color: white;
        }
      }
    }
  }
  .TheaterContainer,
  .SeatContainer {
    margin-left: 50px;
    > p:nth-child(n + 2) {
      font-weight: normal;
      margin-top: 10px;
      font-size: 14px;
    }
  }
`;

const SeatPick = styled.div`
  width: 1200px;
  background-color: white;
  border: 1px solid #e5e5e5;
`;

const CountBox = styled.span`
  .adult {
    &:hover {
      background-color: red;
    }
    :nth-child(${(props) => props.number.count + 1}) {
      background-color: #ec615c;
    }
  }
  .teenager {
    &:hover {
      background-color: red;
    }
    :nth-child(${(props) => props.number.count + 1}) {
      background-color: #ec615c;
    }
  }
  .preferential {
    &:hover {
      background-color: red;
    }
    :nth-child(${(props) => props.number.count + 1}) {
      background-color: #ec615c;
    }
  }
`;
