import React from "react";
import styled from "styled-components";
const Container = styled.div`
  display: ${(props) => (props.display === props.current ? "block" : "none")};
  width: 1200px;
  margin: auto;
  color: black;
  > div {
    margin: 20px 0;
  }
  > p {
    margin: 60px 0 20px;
    font-size: 22px;
  }
`;
const SeatReservation = ({ display }) => {
  return (
    <Container display={display} current={3}>
      <div>seat</div>
    </Container>
  );
};

export default SeatReservation;
