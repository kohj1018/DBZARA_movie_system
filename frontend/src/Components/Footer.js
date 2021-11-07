import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const Container = styled.footer`
  padding-bottom: 40px;
  height: 420px;
  background-color: #8aacc8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Coupon = styled.section`
  width: 100%;
  height: 180px;
  background-color: #aec4c7;
`;
const FooterInner = styled.section`
  margin-top: 60px;
`;
const FooterArea = styled.div``;
const FooterInfo = styled.dl``;
const InfoDl = styled.dl`
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;
const InfoDt = styled.dt``;
const InfoDd = styled.dd``;
const Call = styled.div``;
const CallCont = styled.div``;
const TopShow = styled(Button)``;

const Footer = () => {
  return (
    <>
      <Container>
        <Coupon>할인권 다운로드</Coupon>
        <FooterInner>
          <FooterArea>
            <FooterInfo>
              <InfoDl>
                <InfoDt></InfoDt>
                <InfoDd></InfoDd>
              </InfoDl>
            </FooterInfo>
            <Call>
              <CallCont></CallCont>
              <TopShow></TopShow>
            </Call>
          </FooterArea>
        </FooterInner>
      </Container>
    </>
  );
};

export default Footer;
