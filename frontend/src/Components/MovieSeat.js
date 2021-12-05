import React, { Component } from "react";

import SeatPicker from "react-seat-picker";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  font-family: sans-serif;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .seat-picker {
    margin: 100px 0 120px 0;
  }
  .seat-picker__row {
    background-color: white;
  }
  .seat-picker__row--selected {
    &:hover {
      background-color: white;
    }
  }
`;
// import "./Movie.css";

export default class App extends Component {
  addSeatCallback = ({ row, number, id }, addCb) => {
    this.props.setSelected(`Added seat ${number}, row ${row}, id ${id}`);
    const newTooltip = `tooltip for id-${id} added by callback`;
    addCb(row, number, id, newTooltip);
  };

  addSeatCallbackContinousCase = (
    { row, number, id },
    addCb,
    params,
    removeCb
  ) => {
    let seatData = [];
    seatData.push(`${row}/${number} `);

    if (removeCb) {
      removeCb(params.row, params.number);
    }
    this.props.setSelected(seatData);
    this.props.onMovieSeat((data) => ({
      ...data,
      seat: `${row}/${number}`,
    }));

    const newTooltip = `tooltip for id-${id} added by callback`;
    addCb(row, number, id, newTooltip);
  };

  removeSeatCallback = ({ row, number, id }, removeCb) => {
    // ! 인원수 선택
    const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
    removeCb(row, number, newTooltip);
  };

  render() {
    const rows = [
      [
        { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
        { id: 2, number: 2, tooltip: "Cost: 15$" },
        null,
        {
          id: 3,
          number: "3",
          isReserved: true,
          orientation: "east",
          tooltip: "Reserved by Rogger",
        },
        { id: 4, number: "4", orientation: "west" },
        null,
        { id: 5, number: 5 },
        { id: 6, number: 6 },
        {
          id: 7,
          number: 7,
          isReserved: true,
          tooltip: "Reserved by Matthias Nadler",
        },
        { id: 8, number: 8, isReserved: true },
        null,
        { id: 9, number: "9", isReserved: true, orientation: "east" },
        { id: 10, number: "10", orientation: "west" },
        null,
        { id: 11, number: 11 },
        { id: 12, number: 12 },
      ],
      [
        { id: 13, number: 1 },
        { id: 14, number: 2 },
        null,
        { id: 15, number: 3, isReserved: true, orientation: "east" },
        { id: 16, number: "4", orientation: "west" },
        null,
        { id: 17, number: 5 },
        { id: 18, number: 6 },
        { id: 19, number: 7, tooltip: "Cost: 25$" },
        { id: 20, number: 8 },
        null,
        { id: 21, number: 9, orientation: "east" },
        { id: 22, number: "10", orientation: "west" },
        null,
        { id: 23, number: 11 },
        { id: 24, number: 12 },
      ],
      [
        { id: 25, number: 1, isReserved: true },
        { id: 26, number: 2, orientation: "east" },
        null,
        { id: 27, number: "3", isReserved: true },
        { id: 28, number: "4", orientation: "west" },
        null,
        { id: 29, number: 5, tooltip: "Cost: 11$" },
        { id: 30, number: 6, isReserved: true },
        {
          id: 7,
          number: 7,
          isReserved: true,
          tooltip: "Reserved by Matthias Nadler",
        },
        { id: 8, number: 8, isReserved: true },
        null,
        { id: 9, number: "9", isReserved: true, orientation: "east" },
        { id: 10, number: "10", orientation: "west" },
        null,
        { id: 11, number: 11 },
        { id: 12, number: 12 },
      ],
      [
        { id: 19, number: 1, tooltip: "Cost: 25$" },
        { id: 20, number: 2 },
        null,
        { id: 21, number: 3, orientation: "east" },
        { id: 22, number: "4", orientation: "west" },
        null,
        { id: 23, number: 5 },
        { id: 24, number: 6 },
        { id: 19, number: 7, tooltip: "Cost: 25$" },
        { id: 20, number: 8 },
        null,
        { id: 21, number: 9, orientation: "east" },
        { id: 22, number: "10", orientation: "west" },
        null,
        { id: 23, number: 11 },
        { id: 24, number: 12 },
      ],
      [
        { id: 25, number: 1, isReserved: true },
        { id: 26, number: 2, orientation: "east" },
        null,
        { id: 27, number: "3", isReserved: true },
        { id: 28, number: "4", orientation: "west" },
        null,
        { id: 29, number: 5, tooltip: "Cost: 11$" },
        { id: 30, number: 6, isReserved: true },
        { id: 25, number: 7, isReserved: true },
        { id: 26, number: 8, orientation: "east" },
        null,
        { id: 27, number: "9", isReserved: true },
        { id: 28, number: "10", orientation: "west" },
        null,
        { id: 29, number: 11, tooltip: "Cost: 11$" },
        { id: 30, number: 12, isReserved: true },
      ],
      [
        { id: 25, number: 1, isReserved: true },
        { id: 26, number: 2, orientation: "east" },
        null,
        { id: 27, number: "3", isReserved: true },
        { id: 28, number: "4", orientation: "west" },
        null,
        { id: 29, number: 5, tooltip: "Cost: 11$" },
        { id: 30, number: 6, isReserved: true },
        { id: 25, number: 7, isReserved: true },
        { id: 26, number: 8, orientation: "east" },
        null,
        { id: 27, number: "9", isReserved: true },
        { id: 28, number: "10", orientation: "west" },
        null,
        { id: 29, number: 11, tooltip: "Cost: 11$" },
        { id: 30, number: 12, isReserved: true },
      ],
      [
        { id: 13, number: 1 },
        { id: 14, number: 2 },
        null,
        { id: 15, number: 3, isReserved: true, orientation: "east" },
        { id: 16, number: "4", orientation: "west" },
        null,
        { id: 17, number: 5 },
        { id: 18, number: 6 },
        { id: 19, number: 7, tooltip: "Cost: 25$" },
        { id: 20, number: 8 },
        null,
        { id: 21, number: 9, orientation: "east" },
        { id: 22, number: "10", orientation: "west" },
        null,
        { id: 23, number: 11 },
        { id: 24, number: 12 },
      ],
      [
        { id: 25, number: 1, isReserved: true },
        { id: 26, number: 2, orientation: "east" },
        null,
        { id: 27, number: "3", isReserved: true },
        { id: 28, number: "4", orientation: "west" },
        null,
        { id: 29, number: 5, tooltip: "Cost: 11$" },
        { id: 30, number: 6, isReserved: true },
        {
          id: 7,
          number: 7,
          isReserved: true,
          tooltip: "Reserved by Matthias Nadler",
        },
        { id: 8, number: 8, isReserved: true },
        null,
        { id: 9, number: "9", isReserved: true, orientation: "east" },
        { id: 10, number: "10", orientation: "west" },
        null,
        { id: 11, number: 11 },
        { id: 12, number: 12 },
      ],
    ];
    return (
      <Container>
        <div style={{ marginTop: "10px" }}>
          <SeatPicker
            addSeatCallback={this.addSeatCallbackContinousCase.bind(this)}
            removeSeatCallback={this.removeSeatCallback.bind(this)}
            rows={rows}
            maxReservableSeats={3}
            alpha
            visible
            selectedByDefault
            loading={false}
            tooltipProps={{ multiline: true }}
            continuous
          />
        </div>
      </Container>
    );
  }
}
