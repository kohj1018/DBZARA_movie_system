import React from "react";
import styled from "styled-components";

const RateViewBox = ({ nickName, rates, comment, date }) => {
  // 평점에 따라 별 어떻게 채워줘야하는지 계산하는 부분
  let starWidth = [0, 0, 0, 0, 0];
  const result = parseInt(rates / 2); // 채워야하는 별 개수
  const remainder = ((rates % 2) / 2) * 100; // 마지막 별 채워지는 퍼센트
  for (var i = 0; i < 5; i++) {
      if (i < result) {
        starWidth[i] = 100;
      }
      else if (i < result+1) {
        starWidth[i] = remainder;
      }
      else {
        starWidth[i] = 0;
      }
  }
  return (
    <>
      <ViewBox>
        <ViewTop>
          <StarArea>
            {[0,1,2,3,4].map(idx => {
              return (
                <IcStar>
                  <BgStar
                    style={{width: `${starWidth[idx]}%`}}
                  />
                </IcStar>
              )
            })}
          </StarArea>
        </ViewTop>
        <ViewBottom>
          <ViewText>{comment}</ViewText>
          <ViewWriter>
            <Writer>{nickName}</Writer>
            <Date>{date}</Date>
          </ViewWriter>
        </ViewBottom>
      </ViewBox>
    </>
  );
};

export default RateViewBox;

const ViewBox = styled.div`
  :first-child {
    border-top: none;
  }
  border-top: 1px solid #e5e5e5;
  position: relative;
`;

const ViewTop = styled.div`
  padding: 40px 0 0;
  border: none;
  font-size: 0;
`;

const StarArea = styled.div`
  margin-right: 40px;
  display: inline-block;
  vertical-align: top;
  font-size: 0;
`;

const IcStar = styled.span`
  :first-child {
    margin-left: 0;
  }
  margin-left: 3px;
  display: inline-block;
  vertical-align: top;
  width: 17px;
  height: 17px;
  position: relative;
  background: #ccc;
  :after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url(//movie-img.yes24.com/NYes24/new/bg_star_s.png) no-repeat 0 0;
  }
`;

const BgStar = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: block;
  background: #ec6159;
`;

const ViewBottom = styled.div`
  padding: 20px 160px 40px 0;
  position: relative;
`;

const ViewText = styled.p`
  display: block;
  padding-bottom: 0px;
  line-height: 24px;
  font-size: 15px;
  color: #404040;
  word-break: break-all;
`;

const ViewWriter = styled.p`
  font-size: 12px;
  color: #999;
  padding-top: 20px;
`;

const Writer = styled.span`
  margin-right: 10px;
  padding-right: 9px;
  color: #777;
  border-right: 1px solid #e5e5e5;
  display: inline-block;
  vertical-align: top;
`;

const Date = styled.span`
  display: inline-block;
  vertical-align: top;
  color: #999;
`;