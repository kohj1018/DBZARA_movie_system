import React, { useState } from "react";
import styled from "styled-components"


const Cont = styled.div`
  *{
    box-sizing: border-box;
  }
`;
const EtcArea = styled.div`
  padding-bottom: 130px;
`;
const EtcLayInner = styled.div`
  margin: auto;
  width: 1200px;
`;
const TopTitle = styled.div`
  padding: 60px 0 50px;
  font-size: 30px;
  text-align: center;
  color: #2b2b2b;
  font-weight: bold;
`;
const TabArea = styled.div`
`;
const TabMenu = styled.ul`
    display: table;
    table-layout: fixed;
    width: 100%;
    list-style-type: disc;
`;
const TabList = styled.li`
  display: table-cell;
  border: 1px solid #e5e5e5;
  border-left: none;
  vertical-align: top;
  background: #929292;
  border: none;
`;
const TabListActive = styled.li`
  display: table-cell;
  border: 1px solid #e5e5e5;
  border-left: none;
  vertical-align: top;
  background: #ec615a;
  border: none;
`;
const TabButton = styled.button`
  font-size: 15px;
  text-align: center;
  width: 100%;
  height: 70px;
  /* background: #929292; */
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
`;

const TabCont = styled.div`
`;
const NotiBox = styled.div`
  position: relative;
  margin-top: 60px;
`;
const NoticeDetail = styled.li`
    position: relative;
    padding: 0 0 10px 10px;
    list-style: '-';
    text-align: left;
    color: #777;
    font-size: 15px;
    line-height: 18px;
`;
const StepList = styled.ul`
  padding: 75px 0 80px 0;
  margin-bottom: 80px;
  position: relative;
  list-style: none;
  display: block;
  /* margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px; */
`;
const StepMenuList = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); */
  /* background: #fff; */
  z-index: 10;
  &--top {
      position: fixed;
      top: 0;
  }
`;

const StepTabList = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  color: #000;
  letter-spacing: 0.1rem;
  transition: all 0.5s ease;
  font-size: 18px;
  border-bottom:1px solid #b4b4b4;
  cursor: pointer;
  &:hover {
    color:red;
    transition: all 0.5s ease;
  }
`;
const StepListActive = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  color: #000;
  letter-spacing: 0.1rem;
  transition: all 0.5s ease;
  font-size: 18px;
  border-bottom:2px solid #111;
  cursor: pointer;
`;
const NoticeBox = styled.div`
  position:relative;
`;
const SubTitle = styled.p`
  color: #111;
  font-size: 18px;
  padding: 60px 0 20px 0;
`;



const GuideInfo = () => {

  const [tabClick, setTabClick] = useState(0);

  return (
    <>
      <Cont>
        <Cont style={{ paddingTop: "70px" }}>
          <EtcArea>
            <EtcLayInner>
              <TopTitle>예매 안내</TopTitle>
              <TabArea>
                <TabMenu>
                  {tabClick === 0 ? (
                    <TabListActive>
                      <TabButton onClick={() => {
                        setTabClick(0)
                      }}>예약 방법</TabButton>
                    </TabListActive>
                  ) : (
                      <TabList>
                        <TabButton onClick={() => {
                          setTabClick(0)
                        }}>예약 방법</TabButton>
                      </TabList>
                    )}
                  {tabClick === 1 ? (
                    <TabListActive>
                      <TabButton onClick={() => {
                        setTabClick(1)
                      }}>취소 환불</TabButton>
                    </TabListActive>
                  ) : (
                      <TabList>
                        <TabButton onClick={() => {
                          setTabClick(1)
                        }}>취소 환불</TabButton>
                      </TabList>
                    )}
                </TabMenu>
                <TabContainer tabClick={tabClick} />
              </TabArea>
            </EtcLayInner>
          </EtcArea>
        </Cont>
      </Cont>
    </>
  )
}



const TabContainer = (props) => {

  const [stepClick, setStepClick] = useState(0);

  if (props.tabClick === 0) {
    //예매방법
    return (
      <>
        <TabCont>
          <NotiBox>
            <NoticeDetail>아래 가이드를 보시고 순서에 맞추어 진행하시면 어렵지 않게 예매하실 수 있습니다.</NoticeDetail>
            <NoticeDetail>회원가입 및 로그인을 먼저 해주세요. 비회원 및 본인인증이 안된 ID, 소셜 로그인 으로는 영화예매를 진행할 수 없습니다.</NoticeDetail>
            <NoticeDetail>신규 회원가입을 할 경우에는 반드시 휴대폰인증 혹은 I-Pin 인증으로 가입 하셔야 합니다.</NoticeDetail>
          </NotiBox>
          <StepList>
            <StepMenuList>
              {stepClick === 0 ? (
                <StepListActive onClick={() => { setStepClick(0) }}>STEP1</StepListActive>
              ) : (
                  <StepTabList onClick={() => { setStepClick(0) }}>STEP1</StepTabList>
                )}
              {stepClick === 1 ? (
                <StepListActive onClick={() => { setStepClick(1) }}>STEP2</StepListActive>
              ) : (
                  <StepTabList onClick={() => { setStepClick(1) }}>STEP2</StepTabList>
                )}
              {stepClick === 2 ? (
                <StepListActive onClick={() => { setStepClick(2) }}>STEP3</StepListActive>
              ) : (
                  <StepTabList onClick={() => { setStepClick(2) }}>STEP3</StepTabList>
                )}
              {stepClick === 3 ? (
                <StepListActive onClick={() => { setStepClick(3) }}>STEP4</StepListActive>
              ) : (
                  <StepTabList onClick={() => { setStepClick(3) }}>STEP4</StepTabList>
                )}
            </StepMenuList>
          </StepList>
          <TabDetail stepClick={stepClick} />
        </TabCont>
      </>
    )
  } else {
    // 취소환불
    return (
      <>
        <NoticeBox>
          <SubTitle>
            예매를 취소하고 싶을 때
          </SubTitle>
          <NoticeDetail>
            예매내역 하단에 있는 취소 버튼을 클릭하면 예매를 취소 할 수 있습니다.
          </NoticeDetail>
          <NoticeDetail>
            내역은 ‘나의 예매내역 > 나의 예매/취소 > 취소내역’ 에서 확인 할 수 있습니다.
          </NoticeDetail>
          <NoticeDetail>
            예매취소는 각 극장별 취소가능시간까지만 가능하며, 가능시간 이후에는 취소가 불가능하오니 반드시 취소가능시간을 확인하시기 바랍니다.
          </NoticeDetail>
          <NoticeDetail>
            YES24영화 고객센터 및 각 극장에 전화상으로 취소는 불가능하며 인터넷상에서 취소가 불가능한 경우 관람시간 전에 극장에 방문하시어 현장 취소하셔야 합니다.
          </NoticeDetail>
          <NoticeDetail>
            단, 극장에서 발권한 후에는 시간에 관계없이 온라인 취소는 불가하며 현장취소만 가능 합니다.
          </NoticeDetail>
          <NoticeDetail>
            예매완료 후에는 부분취소나 시간 변동을 할 수 없습니다. 예매내역 전체를 취소한 후 재예매를 하셔야 합니다.
          </NoticeDetail>
        </NoticeBox>
        <NoticeBox>
          <GrayBox style={{ height: "340px" }}>
            <img src="https://movie-img.yes24.com/NYes24/new/guide/pc_16.jpg"></img>
          </GrayBox>
        </NoticeBox>
        <NoticeBox></NoticeBox>
      </>
    )
  }
}

const TabDetail = (props) => {
  if (props.stepClick === 0) {
    return (
      <>
        <div>
          <p style={{ paddingBottom: "10px", color: "#777", fontSize: "15px" }}>영화 홈에서 예매 > 빠른 예매를 클릭 후, 아래 화면으로 들어옵니다.</p>
          <p style={{ paddingBottom: "10px", color: "#777", fontSize: "15px" }}>극장의 취소마감 시간을 잘 확인 하신 후, 원하시는 상영시간을 클릭한 후, 다음단계를 눌러주세요.</p>
          <p style={{ paddingBottom: "10px", color: "#777", fontSize: "15px" }}>영화/극장/시간을 순서에 상관없이 선택 해주세요. 3가지 모두를 선택하시면 아래쪽에 상영시간표가 나타납니다.</p>
        </div>
        <GrayBox>
          <img src="https://movie-img.yes24.com/NYes24/new/guide/pc_10.jpg"></img>
        </GrayBox>
      </>
    )
  }
  if (props.stepClick === 1) {
    return (
      <>
        <div>
          <p style={{ paddingBottom: "10px", color: "#777", fontSize: "15px" }}>개인정보 수집 · 이용 동의 및 제3자 제공에 동의 해주세요. 해당 동의는 티켓발권, 포인트 적립 등의 목적으로 사용됩니다.</p>
          <p style={{ paddingBottom: "10px", color: "#777", fontSize: "15px" }}>예매자의 이름, 휴대폰 번호, 이메일을 확인 해주세요. 예매내역을 알림톡 혹은 문자로 전송해드립니다.</p>
          <p style={{ paddingBottom: "10px", color: "#777", fontSize: "15px" }}>동의 및 확인 하셨으면 다음 단계를 눌러주세요.</p>
        </div>
        <GrayBox>
          <img src="https://movie-img.yes24.com/NYes24/new/guide/pc_11.jpg"></img>
        </GrayBox>
      </>
    )
  }
  if (props.stepClick === 2) {
    return (
      <>
        <div>
          <p style={{ paddingBottom: "10px", color: "#777", fontSize: "15px" }}>관람할 인원을 선택 해주세요. 선택 후, 좌석도를 클릭 하시면 예매 가능한 좌석을 보실 수 있습니다</p>
          <p style={{ paddingBottom: "10px", color: "#777", fontSize: "15px" }}>원하시는 좌석을 선택해주세요. 예매 가능한 좌석은
          <a style={{ color: "red" }}>붉은색</a> 으로 표시 됩니다.</p>
          <p style={{ paddingBottom: "10px", color: "#777", fontSize: "15px" }}>인원과 좌석을 모두 선택하셨으면 다음 단계를 눌러 주세요</p>
        </div>
        <GrayBox>
          <img src="https://movie-img.yes24.com/NYes24/new/guide/pc_12.jpg"></img>
        </GrayBox>
      </>
    )
  }
  if (props.stepClick === 3) {
    return (
      <>
        <div>
          <p style={{ paddingBottom: "10px", color: "#777", fontSize: "15px" }}>사용하고 싶은 할인/기타 결제 수단이 있으시면 선택하여 적용해 주세요. 할인된 내역은 선택정보에 바로 차감되어 표시 됩니다.</p>
          <p style={{ paddingBottom: "10px", color: "#777", fontSize: "15px" }}>할인을 모두 적용하셨다면 최종 결제 수단을 선택해주세요. 최종 결제 금액이 ‘0’원 일 경우에는 바로 결제하기를 눌러주시면 됩니다.</p>
        </div>
        <GrayBox>
          <img src="https://movie-img.yes24.com/NYes24/new/guide/pc_13.jpg"></img>
        </GrayBox>
        <p style={{ padding: "50px 0 10px 0", color: "#777", fontSize: "15px" }}>결제가 정상적으로 이루어지면 회원님의 휴대폰으로 알림톡 혹은 문자로 예매번호가 전송 됩니다.</p>
        <p style={{ paddingBottom: "10px", color: "#777", fontSize: "15px" }}>나의 예매내역 > 예매확인/취소에서 반드시 예매내역을 확인 하세요.</p>
        <p style={{ paddingBottom: "30px", color: "#777", fontSize: "15px" }}>예매내역 아래의 티켓 찾는 방법을 꼭 확인 하시고 극장에 방문하시기 바랍니다.</p>
        <GrayBox>
          <img src="https://movie-img.yes24.com/NYes24/new/guide/pc_14.jpg"></img>
        </GrayBox>
      </>
    )
  }

}

const GrayBox = styled.div`
  margin-top: 25px;
  /* height: 340px; */
  overflow: hidden;
`;


export default GuideInfo;