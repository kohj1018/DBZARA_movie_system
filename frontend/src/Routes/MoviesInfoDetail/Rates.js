import React from "react";
import styled from "styled-components";
import movieData from "movieData";
import RateEditBox from "Components/RateEditBox";
import RateViewBox from "Components/RateViewBox";

const Rates = ({ id }) => (
  <>
    <Container>
      <Title>평점</Title>
      <CommentArea>
        <RateEditBox
          rates={movieData[id].rates}
        />
        <RatesArea>
          <RatesTypeMenuTxt>
            <EmpathyOrder>공감순</EmpathyOrder>
            <LatestOrder>최신순</LatestOrder>
          </RatesTypeMenuTxt>
        </RatesArea>
        <RatesView>
          {movieData[id].review.map(review => {
            return (
              <RateViewBox
                // nickName={review.nickName}
                // rates={review.rates}
                // comment={review.comment}
                // date={review.date}
                {...review}
              />
            )
          })}
        </RatesView>
      </CommentArea>
    </Container>
  </>
);

export default Rates;


const Container = styled.div`
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
    box-sizing: border-box;
    display: block;
    color: #777;
`;

const Title = styled.p`
  margin: 70px 0 20px;
  position: relative;
  font-size: 20px;
  color: #2b2b2b;
`;

const CommentArea = styled.div`
  padding-top: 0;
`;

const RatesArea = styled.div`
  margin-top: 35px;
`;

const RatesTypeMenuTxt = styled.div`
  margin-bottom: 20px;
  text-align: right;
`;

const EmpathyOrder = styled.a`
  color: #2b2b2b;
  margin: 0;
  padding: 0;
  border: none;
  position: relative;
  display: inline-block;
  vertical-align: top;
  font-size: 16px;
  outline: none;
  background: transparent;
  text-decoration: none;
  text-align: right;
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 16px;
    background: #e5e5e5;
    display: none;
  }
`;

const LatestOrder = styled.a`
  position: relative;
  margin-left: 12px;
  padding-left: 14px;
  display: inline-block;
  vertical-align: top;
  font-size: 16px;
  color: #777;
  border-left: 1px solid #d1d1d1;
  outline: none;
  background: transparent;
  text-decoration: none;
  text-align: right;
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 16px;
    background: #e5e5e5;
  }
`;

const RatesView = styled.div`
  border: 1px solid #e5e5e5;
  background: #fff;
  padding: 0 40px;
`;

