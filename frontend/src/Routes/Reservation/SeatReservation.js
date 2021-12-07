import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MovieSeat from "Components/MovieSeat";

// 좌석배정

const SeatReservation = ({
  display,
  onMovieSeat,
  // moviesChoice,
  // theaterChoice,
  // dayChoice,
}) => {
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
  const [selected, setSelected] = useState(new Set([])); //좌석 정보list

  return (
    <Container display={display} current={3}>
      <p>인원/좌석 선택</p>
      <SeatPick>
        <SeatInfo>
          <div className={"PersonnelContainer"}>
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
          </div>
          <div className={"TheaterContainer"}>
            <p>선택한 상영관 및 시간</p>
            <p>상영관 {false ? `theaterChoice.theater` : "디비자라"}</p>
            <p>시간 {false ? `dayChoice.day` : "00"}</p>
            {/* {console.log("moviesChoice", moviesChoice)}
            {console.log("theaterChoice",theaterChoice)}
            {console.log("dayChoice",dayChoice)} */}
          </div>
          <div className={"SeatContainer"}>
            <p>선택한 좌석</p>
            <p>
              {selected.length === 0 || selected.size === 0
                ? "좌석을 선택하세요."
                : selected}
            </p>
          </div>
        </SeatInfo>
        {/* //TODO 상영관 좌성 row, col로 변경 */}
        <Seat
          row={8}
          col={10}
          selected={selected}
          setSelected={setSelected}
          peopleSum={adultNum.count + teenagerNum.count + preferentialNum.count}
        />
      </SeatPick>
    </Container>
  );
};

export default SeatReservation;

const handleClick = (value, selected, setSelected, peopleSum, row, col) => {
  // console.log("value", value.target); //DOM요소
  // console.log("value className", value.target.classList); //class List

  if (value.target.classList[1] === "clicked") {
    value.target.classList.remove("clicked");
    setSelected((seatList) =>
      seatList.filter(
        (value) => value !== `${String.fromCharCode(row + 97)}${col}, `
      )
    );
    // console.log("삭제");
  } else {
    if (!selected.length || selected.length < peopleSum) {
      value.target.classList.add("clicked");
      setSelected((seatList) => [
        ...seatList,
        `${String.fromCharCode(row + 97)}${col}, `,
      ]);
    }

    // console.log("추가");
  }
};

//! 함수를 안에 넣으면 클릭할때마다 리렌더링 다시 되면서 리셋됨
const Seat = ({ row, col, selected, setSelected, peopleSum }) => {
  return (
    <SeatBox row={row} col={col}>
      <div className="screen">screen</div>
      <div>
        {[...Array(row).keys()].map((num1, idx1) => (
          <div className={`row${idx1 + 1}`}>
            <p>{String.fromCharCode(idx1 + 97)}</p>
            {[...Array(col).keys()].map((num2, idx2) => (
              <span
                className={`col${idx2 + 1}`}
                onClick={(value) =>
                  handleClick(
                    value,
                    selected,
                    setSelected,
                    peopleSum,
                    idx1,
                    idx2
                  )
                }
              />
            ))}
          </div>
        ))}
      </div>
      {/* {console.log("selected", selected)} */}
    </SeatBox>
  );
};

const SeatBox = styled.div`
  /* background-color: #e7e7e7; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;
  border-top: 1px solid #e5e5e5;
  .screen {
    margin-left: 30px;
    width: ${(prop) => `${prop.row * 50}px`};
    height: ${(prop) => `${prop.row * 12}px`};
    border-radius: 10px 10px 50px 50px / 10px 10px 50px 50px;
    background-color: #e7e7e7;
    font-size: ${(prop) => `${prop.row * 10}px`};
    color: #e1e1e1;
    text-align: center;
    margin-bottom: 20px;
  }
  .col${(prop) => parseInt(prop.row / 3)},.col${(prop) =>
      parseInt(prop.row / 1.2)} {
    margin-right: 20px;
  }
  .row${(prop) => parseInt(prop.col / 3)},
    .row${(prop) => parseInt(prop.col / 1.5)} {
    margin-top: 20px;
  }
  .clicked {
    background-color: red;
  }
  > div {
    > div {
      display: flex;
      > p {
        width: 30px;
        height: 40px;
        font-size: 20px;
        padding-top: 10px;
      }
      > span {
        background-color: #e7e7e7;
        width: 40px;
        height: 40px;
        border: 1px solid black;
        border-radius: 20px 20px 0 0 / 20px 20px 0 0;
        margin: 2px;
        &:hover {
          background-color: #ec615c;
        }
      }
    }
  }
`;

const PersonCount = ({ name, number, setNumber }) => {
  return (
    <CountBox number={number}>
      {[...Array(9).keys()].map((num, idx) => (
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

const CountBox = styled.span`
  .adult,
  .teenager,
  .preferential {
    &:hover {
      background-color: red;
    }
    :nth-child(${(props) => props.number.count + 1}) {
      background-color: #ec615c;
    }
  }
  .clicked {
    background-color: red;
  }
`;

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
