import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #e1c537;
`;

const Grid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px); //자리 배치(열)
  grid-template-rows: repeat(auto-fill, 50px); //자리 배치(열)
  grid-gap: 20px; // 각 item별
  justify-content: center; //가로 배치
  align-content: center; // 세로 배치
`;

const Section = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    <Grid>{children}</Grid>
  </Container>
);

export default Section;
