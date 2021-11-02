import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  padding-bottom: 40px;
  height: 420px;
  background-color: RGB(191, 189, 97);
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const Div1 = styled.div`
  height: 180px;
`;

const Div2 = styled.div`
  height: 137px;
`;

const Footer = () => {
  return (
    <>
      <Container>
        <Div1>할인권 다운로드</Div1>
        <Div2>footer</Div2>
      </Container>
    </>
  );
};

export default Footer;
