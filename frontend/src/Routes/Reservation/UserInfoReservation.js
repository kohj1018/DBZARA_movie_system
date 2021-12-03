import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 1200px;
  height: 712px;
  padding: 90px 70px 60px 70px;
  margin: auto;
  background: #fff;
  border: 1px solid #e5e5e5;
`;

const UserInfo = styled.div`
  margin: 0 auto 80px;
  width: 570px;
  height: 240px;
  border: 1.5px solid #a7a7a7;
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: black;
  > div {
    width: 467px;
    display: flex;
    > div {
      width: 70px;
    }
  }
  > div:nth-child(n + 1) {
    padding-top: 15px;
  }
  .ui_txt {
    margin-left: 10px;
  }
  .ui_inp {
    display: flex;
    input {
      :nth-child(n + 1) {
        margin-left: 10px;
      }
      width: 100px;
    }
  }
  .li_bar {
    margin: 30px 0 0 70px;
    font-size: 12px;
  }
`;
const AgreeData = styled.div``;

const AgreeInfo = styled.div`
  display: flex;
  width: 100%;
  .agree1 {
    margin-right: 50px;
    width: 370px;
    height: 215px;
    > div {
      > table {
        text-align: left;
        height: 120px;
        margin-bottom: 15px;
        font-size: 13px;
        color: #a7a7a7;
        > tr th {
          :first-child {
            width: 110px;
          }
          :last-child {
            width: 260px;
          }
          border: 1px solid #e5e5e5;
          padding: 7px 0 4px 10px;
        }
      }
      font-size: 14px;
      color: black;
      > div:last-child {
        display: flex;
        > input {
          width: 24px;
          height: 24px;
        }
        > p {
          padding: 8px 0 0 6px;
        }
      }
    }
  }

  .agree2 {
    width: 637px;
    height: 215px;
    > div {
      > table {
        text-align: left;
        height: 120px;
        margin-bottom: 15px;
        font-size: 13px;
        color: #a7a7a7;
        > tr th {
          :first-child {
            width: 110px;
          }
          :last-child {
            width: 527px;
          }
          border: 1px solid #e5e5e5;
          padding: 7px 0 4px 10px;
        }
      }
      font-size: 14px;
      color: black;
      > div:last-child {
        display: flex;
        > input {
          width: 24px;
          height: 24px;
        }
        > p {
          padding: 8px 0 0 6px;
        }
      }
    }
  }
`;

const AllAgree = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  p:first-child {
    font-size: 15px;
    margin-right: 40px;
  }

  input {
    width: 24px;
    height: 24px;
  }

  p:last-child {
    margin-left: 5px;
    font-size: 24px;
  }
`;

const UserInfoReservation = () => {
  return (
    <Container>
      <UserInfo>
        <div class="inp_line ui_name">
          <div class="ui_tit">예매자</div>
          <div class="ui_inp">
            <p class="ui_txt">조재훈</p>
          </div>
        </div>
        <div class="inp_line ui_phone">
          <div class="ui_tit">휴대폰</div>
          <div class="ui_inp">
            <div class="select_line select_area">
              <input type="text" />
            </div>
            <div class="ui_inp_para">
              <input type="text" onkeydown="hpInNumber()" maxlength="4" />
            </div>
            <div class="ui_inp_para">
              <input type="text" onkeydown="hpInNumber()" maxlength="4" />
            </div>
          </div>
        </div>
        <div class="inp_line ui_email">
          <div class="ui_tit">이메일</div>
          <div class="ui_inp ">
            <div class="ui_inp_para">
              <input type="text" id="email1" class="inp_st" />
            </div>
            <div class="ui_inp_para at_sign">@</div>
            <div class="ui_inp_para">
              <input type="text" id="email2" class="inp_st" />
            </div>
            <div class="select_line select_area">
              <input type="text" />
              <div class="sel_val eve_sel"></div>
              <div class="sel_option eve_list" id="selEmail"></div>
            </div>
          </div>
        </div>
        <ul class="li_bar">
          <li>
            - 예매 완료시 예매번호를 전송해 드립니다. 휴대폰 번호를 꼭
            확인하세요.
          </li>
          <li>
            - 부정확한 정보로 인한 예매사고 발생시 YES24는 책임을 지지 않습니다.
          </li>
        </ul>
      </UserInfo>
      <AgreeData>
        <AgreeInfo>
          <div className="agree1">
            <div>
              <table>
                <tr>
                  <th>수집목적</th>
                  <th>DBZARA</th>
                </tr>
                <tr>
                  <th>목적</th>
                  <th>상영시간 변경 등 긴급한 경우 연락을 위한 목적</th>
                </tr>
                <tr>
                  <th>항목</th>
                  <th>이름, 휴대폰번호, 이메일 주소</th>
                </tr>
                <tr>
                  <th>보유 이용기간</th>
                  <th>극장정산 및 회계처리를 위해 6개월 보관</th>
                </tr>
              </table>
              <div>
                <input type="checkBox" />
                <p>[필수] 개인정보 수집 · 이용 동의</p>
              </div>
            </div>
          </div>
          <div className="agree2">
            <div>
              <table>
                <tr>
                  <th>수집목적</th>
                  <th>DBZARA</th>
                </tr>
                <tr>
                  <th>목적</th>
                  <th>상영시간 변경 등 긴급한 경우 연락을 위한 목적</th>
                </tr>
                <tr>
                  <th>항목</th>
                  <th>이름, 휴대폰번호, 이메일 주소</th>
                </tr>
                <tr>
                  <th>보유 이용기간</th>
                  <th>극장정산 및 회계처리를 위해 6개월 보관</th>
                </tr>
              </table>
              <div>
                <input type="checkBox" />
                <p>[필수] 개인정보 수집 · 이용 동의</p>
              </div>
            </div>
          </div>
        </AgreeInfo>
        <AllAgree>
          <p>
            정보제공에 동의하지 않을 권리가 있으나, 동의하지 않을 경우 예매를
            진행할 수 없습니다.
          </p>
          <input type="checkbox" />
          <p>전체동의</p>
        </AllAgree>
      </AgreeData>
    </Container>
  );
};

export default UserInfoReservation;
