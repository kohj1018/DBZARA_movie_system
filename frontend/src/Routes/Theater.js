import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const Container = styled.div`
  margin: 60px 0 5px 10px;
  padding: 15px;
  width: 10%;
  color: blue;
  display: flex;
  background-color: white;
`;

const Btn = styled(Button)`
  && {
    color: blue;
    size: small;
  }
`;

const Home = () => (
  <>
    <Container>
      <Btn>극장1</Btn>
    </Container>
  </>
);

export default Home;
