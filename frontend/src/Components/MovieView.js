import React from "react";
import styled from "styled-components";
import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

// TODO movies poster로 연결하고



const MovieView = ({ isFilmo, id, rank, src, age, title, ticketSales, rates }) => {
  
  var ageColorStyle = {};
  // 연령별로 색깔 다르게 표시
  switch (age) {
    case 0:
      ageColorStyle = {
        color: "#60c9e3",
        border: "1px solid #60c9e3",
        fontSize: "12px",
        lineHeight: "1",
        padding: "5px 25px 0px 0px",
      };
      break;
    case 12:
      ageColorStyle = {
        color: "#6dd551",
        border: "1px solid #6dd551",
        fontSize: "15px",
        lineHeight: "0.7",
        padding: "5px 0px 0px 0px",
      };
      break;
    case 15:
      ageColorStyle = {
        color: "#fbac30",
        border: "1px solid #fbac30",
        fontSize: "15px",
        lineHeight: "0.7",
        padding: "5px 0px 0px 0px",
      };
      break;
    case 19:
      ageColorStyle = {
        color: "#d30101",
        border: "1px solid #d30101",
        fontSize: "12px",
        lineHeight: "1",
        padding: "5px 25px 0px 0px",
      };
      break;
    default:
      ageColorStyle = {
        color: "#6dd551",
        border: "1px solid #6dd551",
        fontSize: "15px",
        lineHeight: "0.7",
        padding: "5px 0px 0px 0px",
      };
      break;
  }
  
  switch (age) {
    case 0:
      age = "전체";
      break;
    case 19:
      age = "청불";
      break;
    default:
      break;
  }
  return (
    isFilmo === false ? (
      <>
        <Container>
          <ImgThumb>
            <Poster src={src} alt="poster" />
            <BtnContainer>
              <OverBtn>
                <Btn>
                  <SLink to={"/Reservation"}>예매</SLink>
                </Btn>
                <Btn>
                  <SLink to={`/MoviesInfo/Index/${id}`}>정보</SLink>
                </Btn>
              </OverBtn>
            </BtnContainer>
          </ImgThumb>
          <MvInfo>
            <MvTit>
              <Age style={ageColorStyle}>{age}</Age>
              {title}
            </MvTit>
            <MvTxt>
              <TicketSales>예매율 : {ticketSales}%</TicketSales>
              <Rates>평점 : {rates}</Rates>
            </MvTxt>
          </MvInfo>
        </Container>
      </>
    ) : (
      <>
        <Container>
          <SLink2 to={`/MoviesInfo/Index/${id}`}>
            <ImgThumb>
              <Poster src={src} alt="poster" />
            </ImgThumb>
            <MvInfo style={{ padding: "35px 0" }}>
              <MvTit>
                <Age style={ageColorStyle}>{age}</Age>
                {title}
              </MvTit>
            </MvInfo>
          </SLink2>
        </Container>
      </>
    )
  );
};

export default MovieView;

const Container = styled(Box)`
  && {
    height: 486.8px;
    width: 275.5px;
    display: inline-block;
    vertical-align: top;
    border: 1px solid #e5e5e5;
    cursor: pointer;
  }
`;

const ImgThumb = styled.div`
  position: relative;
  height: 392px;
  overflow: hidden;
  background: #e5e5e5;
`;

const Poster = styled.img`
  width: 100%;
`;

const BtnContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
`;

const OverBtn = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Btn = styled(Button)`
  && {
    margin: 10px auto 0;
    display: block;
    width: 150px;
    height: 58px;
    font-size: 16px;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.5);
    &:hover {
      color: #ec6159;
      border: 1px solid #ec6159;
    }
  }
`;

const SLink = styled(Link)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SLink2 = styled(Link)`
  :hover {
    display: block;
    border: 3px solid red;
  }
`;

const MvInfo = styled.div`
  padding: 25px 0;
  text-align: center;
  background: #fff;
`;

const MvTit = styled.p`
  margin: 0 auto;
  max-width: 240px;
  font-size: 19px;
  line-height: 20px;
  font-weight: normal;
  color: #2b2b2b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const MvTxt = styled.p`
  margin-top: 10px;
`;

const Age = styled.span`
  margin-right: 5px;
  display: inline-block;
  width: 25px;
  height: 22px;
  text-align: center;
`;

// line-height: ${(props) => props.ageAttr["line-height"]};
// color: ${(props) => props.ageAttr["color"]};
// border: ${(props) => props.ageAttr["border"]};
// padding: ${(props) => props.ageAttr["padding"]};
// font-size: ${(props) => props.ageAttr["font-size"]};

const TicketSales = styled.span`
  margin-left: 0;
  padding-left: 0;
  border: none;
  display: inline-block;
  vertical-align: top;
  font-size: 13px;
  color: black;
`;

const Rates = styled.span`
  margin-left: 9px;
  padding-left: 10px;
  display: inline-block;
  vertical-align: top;
  font-size: 13px;
  border-left: 1px solid #ccc;
  color: black;
`;
