import React, { useState } from "react";
import styled from "styled-components";



const UserTicketArea = styled.div`
    height: 1412px;
    padding-top: 60px;
    /* height: auto; */
    *{
    box-sizing: border-box;
    }
`;
const UserTicketMenu = styled.div`
    margin-bottom: 60px;
    text-align: center;
`;
const TabMenu = styled.a`
    padding-bottom: 7px;
    display: inline-block;
    vertical-align: top;
    font-size: 15px;
    color: #777;
    cursor: pointer;
`;
const TabMenuActive = styled.div`
    padding-bottom: 7px;
    display: inline-block;
    vertical-align: top;
    font-size: 15px;
    color: #2b2b2b;
    border-bottom: 3px solid #2b2b2b;
    font-weight: normal;
`;
const TabMenuDefault = styled.div`
    border-bottom: 1px solid #777;
    padding-bottom: 7px;
    display: inline-block;
    vertical-align: top;
    font-size: 15px;
    color: #777;
`;
const UserTicketList = styled.div`
    height: 154px;
`;
const ListMent = styled.p`
    padding-bottom: 20px;
    font-size: 16px;
    color: #2b2b2b;
    text-align: left;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    line-height: 16px;
`;
const MyTicketList = styled.div`
    margin-bottom: 30px;
    padding: 50px;
    border: 1px solid #e5e5e5;
    background: #fff;
    font-size: 0;
    color:#777;
    font-size: 15px;
`;
const NoticeArea = styled.div`
    margin-top: 95px;
    border-top: 1px solid #e5e5e5;
`;
const NoticeTitle = styled.p`
    padding: 80px 0 30px;
    font-size: 20px;
    color: #2b2b2b;
    text-align: left;
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
const NoticeDetailSub = styled.p`
    text-align: left;
    color: #777;
    font-size: 15px;
    line-height: 24px;
`;


const Checking = ({ id }) => {

    const [tabClick, setTabClick] = useState(0);

    return (
        <>
            <UserTicketArea>
                <UserTicketMenu>
                    {/* <TabMenu> */}
                    {tabClick === 0 ? (
                        <TabMenuActive>
                            <TabMenu onClick={() => {
                                setTabClick(0)
                            }}>예매내역</TabMenu>
                        </TabMenuActive>
                    ) : (<TabMenuDefault>
                        <TabMenu onClick={() => {
                            setTabClick(0)
                        }}>예매내역</TabMenu>
                    </TabMenuDefault>
                        )}
                    {tabClick === 1 ? (
                        <TabMenuActive>
                            <TabMenu onClick={() => {
                                setTabClick(1)
                            }}><a style={{ marginLeft: "60px", color: "#777" }}>취소내역</a></TabMenu>
                        </TabMenuActive>
                    ) : (<TabMenuDefault>
                        <TabMenu onClick={() => {
                            setTabClick(1)
                        }}><a style={{ marginLeft: "60px", color: "#777" }}>취소내역</a></TabMenu>
                    </TabMenuDefault>
                        )}
                    {/* </TabMenu> */}
                    <UserTicketList>
                        <ListMent>
                            관람 가능 예매내역 0건
                            <span style={{ color: "#777", fontSize: "15px" }}> (단, 취소가능 시간이 지나면 예매취소 버튼은 보이지 않습니다.)</span>
                        </ListMent>
                        <MyTicketList>
                            예매 내역이 없습니다.
                        </MyTicketList>
                        <NoticeArea>
                            <NoticeTitle>예매하고 티켓 찾기</NoticeTitle>
                            <NoticeDetail>
                                예매완료 시 생성되는 예매번호로 매표소 및 무인 발권기에서 티켓을 수령할 수 있습니다.
                            </NoticeDetail>
                            <NoticeDetail style={{ marginBottom: "10px" }}>
                                예고편 상영 등 극장 사정에 의해 영화시작이 10여분 차이 날 수 있습니다.
                            </NoticeDetail>
                            <NoticeDetailSub>
                                ※영화 상영시작 이후에는 티켓발권 및 예매취소가 불가능할 수 있습니다. 일부 극장은 상영시작 이후 입장이 제한될 수 있으니, 반드시 상영시작 시간 내에 발권 후 입장해 주세요.
                            </NoticeDetailSub>
                            <NoticeDetailSub>
                                ※ 청소년 관람불가 영화는 보호자를 동반해도 만 18세 미만 고객은 관람이 불가합니다. 상영관 입장 시, 신분증을 지참하시기 바랍니다.
                            </NoticeDetailSub>
                            <NoticeTitle>예매를 취소하고 싶을 때</NoticeTitle>
                            <NoticeDetail>예매취소는 각 극장별 취소가능시간까지만 가능하며, 가능시간 이후에는 취소가 불가능하오니 반드시 취소가능시간을 확인하시기 바랍니다.</NoticeDetail>
                            <NoticeDetail>YES24영화 고객센터 및 각 극장에 전화상으로 취소는 불가능하며 인터넷상에서 취소가 불가능한 경우 관람시간 전에 극장에 방문하시어 현장 취소하셔야 합니다.</NoticeDetail>
                            <NoticeDetail>단, 극장에서 발권한 후에는 시간에 관계없이 온라인 취소는 불가하며 현장취소만 가능 합니다.</NoticeDetail>
                            <NoticeDetail style={{ marginBottom: "10px" }}>예매완료 후에는 부분취소나 시간 변동을 할 수 없습니다. 예매내역 전체를 취소한 후 재예매를 하셔야 합니다.</NoticeDetail>
                            <NoticeTitle>극장 현장에서 취소 했을 때</NoticeTitle>
                            <NoticeDetail>극장 현장에서 취소하신 경우 취소 내역은 관람일 다음날 오전 중에 반영 됩니다.</NoticeDetail>
                            <NoticeDetail>이 때 결제도 함께 취소되니 현장 취소시에 유의하시기 바랍니다.</NoticeDetail>
                            <NoticeTitle>환불규정</NoticeTitle>
                            <NoticeDetailSub style={{ marginBottom: "30px" }}>영화 예매 후, 취소 가능시간 내에 인터넷에서 취소를 하면 예매 수수료 포함 전액이 환불됩니다</NoticeDetailSub>
                            <NoticeDetail>YES머니, YES상품권, 예매권, 할인권, 예치금, 가족계좌, OK캐시백 : 결제 취소시 자동 환불. 단 YES상품권, 예매권, 할인권의 경우 사용기간이 지난 시점이라면 환불 불가</NoticeDetail>
                            <NoticeDetail>신용카드 : 결제일과 취소일이 다를 경우 영업일 기준 3~5일 정도 소요</NoticeDetail>
                            <NoticeDetail>체크카드 : 결제일과 취소일이 다를 경우 영업일 기준 3~5일 정도 소요</NoticeDetail>
                            <NoticeDetail>계좌이체 : 취소한 시점의 은행 영업일로 부터 1~2일내 고객님 계좌로 자동 환불</NoticeDetail>
                            <NoticeDetail>휴대폰결제 : 결제 당월 취소 시 취소 당일 환불 (익월 취소 시 결제 익월 28일 이후 예치금으로 환불)</NoticeDetail>
                        </NoticeArea>
                    </UserTicketList>
                </UserTicketMenu>
            </UserTicketArea>
        </>
    )
}



export default Checking;