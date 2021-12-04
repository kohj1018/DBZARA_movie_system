import { DomainDisabled } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";


const Cont = styled.div`
    padding-top: 60px;
    height: 2419px;
`;
const NoticeTxt = styled.p`
  padding-bottom: 20px;
  color: #2b2b2b;
  font-size: 15px;
`;
const RedBox = styled.div`
  margin: 20px 0 30px;
  height: 80px;
  font-size: 0;
  border: 3px solid #ec6159;
  background: #fff;
`;
const RedBoxTxt = styled.textarea`
  display: inline-block;
  width: calc(100% - 120px);
  height: 100%;
  font-size: 22px;
  font-weight: bold;
  color: #2b2b2b;
  text-align: center;
  vertical-align: top;
  border: none;
  resize: none;
`;
const RedBoxCont = styled.div`
  padding: 10px 10px 10px 10px;
  position: relative;
`;
const RedBtn = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 146px;
  font-size: 20px;
  color: #fff;
  background: #ec6159;
  cursor: pointer;
  border: none;
`;
const NoticeDetail = styled.li`
    position: relative;
    padding: 0 0 10px 10px;
    list-style: '-';
    text-align: left;
    color: #777;
    font-size: 15px;
    line-height: 1;
`;
const NoticeTitle = styled.p`
    padding: 80px 0 20px;
    font-size: 20px;
    color: #2b2b2b;
    text-align: left;
`;
const UserContArea = styled.div``;
const NoticeArea = styled.div`
    margin-top: 95px;
    border-top: 1px solid #e5e5e5;
`;
const TicketTable = styled.table`
  border: 1px solid #e5e5e5;
  display: grid;
  height: 112px;
  grid-template-columns: 110px 230px 230px 96px 392px 140px;
  grid-template-rows: repeat(2, 1fr);
  font-size: 13px;
  color: #2b2b2b;
  > th{
    :nth-child(-n+6){
      background: #e5e5e5;
    }
    background: #fff;
    padding-top : 17px;
  }
`;
const SalesTable = styled.table`
  border: 1px solid #e5e5e5;
  display: grid;
  height: 112px;
  grid-template-columns: 110px 230px 230px 90px 90px 308px 140px;
  grid-template-rows: repeat(2, 1fr);
  font-size: 13px;
  color: #2b2b2b;
`;




const Registration = ({ id }) => {
  return (
    <>
      <Cont>
        <NoticeTxt>
          사용가능 예매권  '0' 매, 할인권  '1' 매  <span style={{ color: "#777" }}>(2021년 등록한 예매권  '0' 매)</span>
        </NoticeTxt>
        {/* 상품권 등록 부분 */}
        <RedBox>
          <RedBoxCont>
            <RedBoxTxt placeholder="이곳에 예매권 및 할인권 코드를 입력하세요" />
            <RedBtn>등록</RedBtn>
          </RedBoxCont>
        </RedBox>
        <NoticeDetail>예매권/할인권은 반드시 본인인증을 하셔야만 등록 가능합니다.</NoticeDetail>
        <NoticeDetail>예매권/할인권 등록 후 반드시 영화예매를 완료해야만 영화 관람이 가능합니다.</NoticeDetail>
        <NoticeDetail>입력번호 중 한자라도 틀리거나 공란이 있을 시 등록이 되지 않으니 정확히 확인하시고 입력해주세요.</NoticeDetail>
        <UserContArea>
          <NoticeTitle>예매권</NoticeTitle>
          <TicketTable>
            <th>구분</th>
            <th>예매권 번호</th>
            <th>사용기간</th>
            <th>사용가능/매수</th>
            <th>특이사항</th>
            <th></th>
            <th > 1</th>
            <th > 2</th>
            <th > 2</th>
            <th > 2</th>
            <th > 2</th>
            <th > 2</th>
          </TicketTable>
          <NoticeDetail style={{ marginTop: "30px" }}>연간 예매권 등록매수는 1인당 24매(1인 1매권)로 제한됩니다. 24회 초과 시 예매권 등록이 불가합니다.</NoticeDetail>
          <NoticeDetail>동일한 그룹의 예매권은 한 아이디당 4매(1인 1매권)까지만 등록이 가능합니다.</NoticeDetail>
          <NoticeDetail>영화 예매권 결제는 관람요금이 14,000원 이하인 경우에 한합니다. (장당 추가 결제 불가)</NoticeDetail>
          <NoticeTitle>할인권</NoticeTitle>
          <SalesTable>
            <th style={{ background: "#e5e5e5", paddingTop: "17px" }}>구분</th>
            <th style={{ background: "#e5e5e5", paddingTop: "17px" }}>예매권 번호</th>
            <th style={{ background: "#e5e5e5", paddingTop: "17px" }}>사용기간</th>
            <th style={{ background: "#e5e5e5", paddingTop: "17px" }}>사용가능/매수</th>
            <th style={{ background: "#e5e5e5", paddingTop: "17px" }}>할인금액</th>
            <th style={{ background: "#e5e5e5", paddingTop: "17px" }}>특이사항</th>
            <th style={{ background: "#e5e5e5", paddingTop: "17px" }}></th>
            <th style={{ background: "#fff", paddingTop: "17px" }} >일반할인권</th>
            <th style={{ background: "#fff", paddingTop: "17px" }} >SFZ38CM988AA229CK539</th>
            <th style={{ background: "#fff", paddingTop: "17px" }} >2021/11/29~2021/12/29</th>
            <th style={{ background: "#fff", paddingTop: "17px" }} >'1/1'</th>
            <th style={{ background: "#fff", paddingTop: "17px" }} >1,000원</th>
            <th style={{ background: "#fff", paddingTop: "17px" }} >11월 신규회원 프로모션(등록일 기준)</th>
            <th style={{ background: "#fff", paddingTop: "17px" }} > 2</th>
          </SalesTable>
        </UserContArea>
        <NoticeArea>
          <NoticeTitle>DBZARA 영화 예매권/할인권 이란?</NoticeTitle>
          <p style={{ paddingBottom: "20px", color: "#2b2b2b", fontWeight: "bold", fontSize: "15px" }}>예매권</p>
          <p style={{ marginBottom: "30px", color: "#777", fontSize: "15px", lineHeight: "24px" }}>
            로그인 후 받으신 고유 번호를 등록하여 원하는 극장과 날짜의 영화를 예매할 수 있는 무료 이용권입니다.<br></br>
          단, 예매권의 형태에 따라 사용방법이 상이하오니 예매권이 종류를 정확히 확인 해주세요.</p>
          <NoticeDetail style={{ fontSize: "15px" }}>일반영화 예매권 : YES24에서 예매 가능한 모든 극장과 날짜의 영화 예매 가능</NoticeDetail>
          <NoticeDetail style={{ fontSize: "15px" }}>지정영화 예매권 : 예매권에 지정된 영화만 예매 가능</NoticeDetail>
          <NoticeDetail style={{ fontSize: "15px" }}>1+1예매권 : 2인 이상 예매시 1매 예매 가능</NoticeDetail>
          <NoticeDetail style={{ fontSize: "15px", marginBottom: "10px" }}>평일 예매권 : 토요일, 일요일, 공휴일을 제외한 평일영화만 예매 가능</NoticeDetail>
          <p style={{ paddingBottom: "20px", color: "#2b2b2b", fontWeight: "bold", fontSize: "15px", marginTop: "40px" }}>예매권</p>
          <p style={{ marginBottom: "30px", color: "#777", fontSize: "15px", lineHeight: "24px" }}>
            로그인 후 받으신 고유 번호를 등록하여 예매시, 할인권 금액만큼 할인 받고 예매할 수 있는 이용권입니다.<br></br>
          예매권/할인권의 분실 또는 도난에 대해서는 YES24가 책임지지 않습니다.</p>

          <NoticeTitle>예매권/할인권 등록</NoticeTitle>
          <NoticeDetail>YES24 영화예매권/할인권은 단 한번만 등록 가능합니다.</NoticeDetail>
          <NoticeDetail>한번 등록된 영화예매권/할인권은 등록 취소 및 다른 ID로 재등록 할 수 없습니다.</NoticeDetail>
          <NoticeDetail>등록된 영화예매권/할인권의 사용은 해당 회원 ID로 영화예매시에만 사용 가능합니다.</NoticeDetail>
          <NoticeDetail>동일 종류 영화예매권은 한 ID당 최대 4매까지 등록 가능합니다. (4매보다 더 많은 동일 예매권을 가지고 계시다면, 다른 ID로 나누어 예매권을 등록해 주셔야 합니다.)</NoticeDetail>
          <NoticeDetail>연간 예매권 등록매수는 1인당 24매로 제한됩니다. 24회 초과 시 예매권 등록이 불가합니다.</NoticeDetail>
          <NoticeDetail>법인아이디로 로그인 하면 예매권/할인권 등록 및 예매가 불가능합니다.</NoticeDetail>

          <NoticeTitle>등록 후 예매 및 관람</NoticeTitle>
          <NoticeDetail>영화예매권/할인권을 등록하신 이후에는 반드시 나의 예매내역 > 예매권/할인권 에서 등록된 예매권의 사용기간과 사용매수, 할인금액을 확인하시기 바랍니다.</NoticeDetail>
          <NoticeDetail>영화예매권 결제는 관람요금이 14,000원 이하인 경우에 한합니다. (극장별 3D상영버전이나 묶음상영, 일부 극장의 주말 요금이 14,000원을 초과할 경우 예매권 결제 금액에 따라 이용불가)</NoticeDetail>
          <NoticeDetail>영화예매권/할인권 등록만으로 영화관람은 불가능하며, 반드시 예매 마감 시간 전에 YES24 영화에서 영화 예매를 완료하셔야 합니다. (영화, 극장, 날짜, 회차 등 선택 후 마지막 결제 단계에서 예매권, 할인권 사용 가능)</NoticeDetail>
          <NoticeDetail>영화예매권/할인권에 지정된 사용기간은 따로 표기가 있지 않으면 예매일 기준입니다.(관람일이 예매권/할인권 사용기간 이후라도, 기간안에 미리 예매해두시면 됩니다.)</NoticeDetail>
          <NoticeDetail>특정한 영화나 극장이 지정된 영화예매권/할인권 인지 확인해 주세요. 영화가 지정된 영화예매권은 사용기간 내에 해당영화가 종영되면 사용기간이 남아도 영화예매권을 사용할 수 없습니다.</NoticeDetail>
          <NoticeDetail>예매권/할인권은 YES24 영화에서 예매가 가능한 상영관에 한 해 사용이 가능합니다. (예매가 오픈 되지 않는 일부 특별관 제외)</NoticeDetail>
          <NoticeDetail>영화할인권은 한번 예매시 1개만 사용 가능합니다. (단, 마니아 추가혜택 영화할인권은 해당 영화할인권에 한해 2매 이상 예매시 2개 동시 사용이 가능합니다.)</NoticeDetail>
          <NoticeDetail>영화예매권/할인권으로 예매 후 극장에서 예매번호로 반드시 티켓발권을 하셔야 합니다.</NoticeDetail>

          <NoticeTitle>예매 취소 시</NoticeTitle>
          <NoticeDetail>영화예매 취소시, 영화예매권/할인권은 다시 사용가능으로 복구됩니다.</NoticeDetail>
          <NoticeDetail>단, 예매 취소하는 시점이 영화예매권/할인권 사용기간이 지난 후라면 영화예매권은 복구되지 않습니다. 예매취소하기 전에 사용기간을 꼭 확인해 주시기 바랍니다.</NoticeDetail>
          <NoticeDetail>극장현장에서 영화예매권/할인권으로 결제한 영화를 취소할 경우, 현금 환불을 받거나 다른 영화로 변경이 불가합니다.</NoticeDetail>
          <NoticeDetail>극장 현장에서 취소하신 경우 취소 내역은 관람일 다음날 오전 중에 반영 됩니다. 사용하신 예매권/할인권의 복구도 이 때 함께 진행되니 취소에 유의하시기 바랍니다.</NoticeDetail>
        </NoticeArea>
      </Cont>
    </>
  )
}

export default Registration;
