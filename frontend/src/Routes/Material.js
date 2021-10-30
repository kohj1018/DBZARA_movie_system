import React, { useState } from "react";
import styled from "styled-components";
import { Button, Typography } from "@material-ui/core";

const Container = styled.div`
  margin-top: 50px;
  padding: 15px;
  color: blue;
  display: flex;
`;

const Btn = styled(Button)`
  && {
    color: blue;
    size: medium;
  }
`;
const Demo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TypoGraphy = styled(Typography)`
  && {
  }
`;

const Material = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container>
        <Btn variant="contained">material</Btn>
        <Demo>
          <TypoGraphy variant="subtitle1" component="div">
            대화창 만들기
          </TypoGraphy>

          <Btn variant="outlined" onClick={() => setOpen(true)}>
            open
          </Btn>
        </Demo>
        {/* <SimpleDialog /> */}
      </Container>
    </>
  );
};

// const SimpleDialog = ({, open}) => {};

export default Material;
