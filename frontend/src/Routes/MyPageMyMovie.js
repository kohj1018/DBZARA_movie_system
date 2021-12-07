import React from "react";
import styled from "styled-components";



const Cont = styled.div`
  padding-top: 70px;
  padding-bottom: 100px;
  background: #eee;
  *{
    box-sizing: border-box;
  }
`;
const ContInner = styled.div`
  margin: auto;
  width: 1200px;
`;
const Title = styled.div`
  padding: 60px 0 50px;
  font-size: 30px;
  text-align: center;
  color: #2b2b2b;
  font-weight: bold;
`;
const MyTicketArea = styled.div`

`;
const HowMany = styled.div`
  position: relative;
  color: #777;
  padding-bottom: 20px;
  line-height: 16px;
`;
const HowManyTxt = styled.span`
  color: #2b2b2b;
  font-size: 15px;
`;
const TicketList = styled.div`
  display: block;
`;
const TicketInfo = styled.div`
    margin-bottom: 30px;
    padding: 50px;
    border: 1px solid #e5e5e5;
    background: #fff;
    font-size: 0;
`;



const MyPageMyMovie = () => {
  return (
    <>
      <Cont>
        <ContInner>
          <Title>내가 본 영화</Title>
          <MyTicketArea>
            <HowMany>
              <HowManyTxt>총 0개
                <span style={{ color: "#777", fontSize: "15px" }}> (최근 6개월 내 내역)</span>
              </HowManyTxt>
            </HowMany>
            <TicketList>
              <TicketInfo>
                <p style={{ color: "#777", fontSize: "14px", textAlign: "center" }}>예매 내역이 없습니다.</p>
              </TicketInfo>
            </TicketList>
          </MyTicketArea>
        </ContInner>
      </Cont>
    </>
  )
}


export default MyPageMyMovie;