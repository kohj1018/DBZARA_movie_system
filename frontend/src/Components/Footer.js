import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const FooterCont = styled.div`
  max-width: 100%;
  min-width: 1200px;
  padding-top: 1px;
  padding-bottom: 40px;
  height: 231.88px;
  background-color: #e7e7e7;
  display: block;
  flex-direction: column;
  align-items: center;
`;
const FooterInner = styled.div`
  /* margin-top : 60px;
  line-height: 1; */
  /* margin: 60px; */
  width:1200px;
  height: 131.875px;
  display: block;
  margin: auto;
`;
const FooterArea = styled.div`
  margin-top:60px;
  line-height:1;
`;
// const FooterInfo = styled.div``;
const InfoDl = styled.div`
  font-size:0;
  float:left;
  /* display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px; */
`;
const InfoDt = styled.div`
  /* width: 188.99px;
  height: 20px;
  font-size: 15px;
  color: #777; */
  padding-right: 75px;
  display: inline-block;
  vertical-align: top;
`;
const DtSpan = styled.span`
  width:114px;
  font-size: 20px;
  padding-left: 70px;
  font-weight: bold;
  color: #2b2b2b;
  /* background:url('//movie-img.yes24.com/NYes24/new/logo.png') no-repeat 0 -39px; */
`;
const InfoDd = styled.div`
  width: 481.29px;
  height: 131.88px;
  display:inline-block;
  vertical-align:top;
  padding-top: 3px;
`;
const DivDd = styled.div`
  width : 481.29px;
  height : 12.222px;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  color: #2b2b2b;
`;
const DdText = styled.div`
  padding:0 11px;
  display:inline-block;
  vertical-align:top;
  border-left:1px solid #d0d0d0;
  font-size:13px;
  color:#2b2b2b;
`;
const DdTextFirst = styled.div`
  padding:0 11px 0 0;
  border:none;
  font-size:13px;
  color:#2b2b2b;
  display:inline-block;
  vertical-align:top;
`;
const AddrInfo = styled.div`
  width: 481.29px;
  height: 94.65px;
  margin-top:25px;
  font-size:12px;
  color:#939393;
  font-style:normal;
`;
const FcName = styled.span`
  margin-bottom:10px;
  display:block;
  box-sizing: border-box;
  color: #939393;
  font-size: 13px;
  text-align:left;
`;
const Location = styled.div`
  padding-bottom: 7px;
  font-size: 13px;
  text-align:left;
`;
const Call = styled.div``;
const CallCont = styled.p`
  padding-bottom: 7px;
  text-align:left;
  color: #939393;
  font-style: normal;
  font-size: 12px;
`;
const FooterCall = styled.div`
  position: relative;
  padding-left:26px;
  float:right;
  width:248px;
  height: 81.771px;
  border-left:1px solid #e4e4e4;
`;
const FooterCallCont = styled.div`
  margin-bottom:19px;
`;
const CallContTxt = styled.p`
  /* padding-bottom:5px;
  font-size:12px;
  color:#939393; */
  padding-bottom: 10px;
  font-size: 14px;
  color: #2b2b2b;
`;
const InquiryLink = styled.span`
  display: block;
  width: 135px;
  text-align: center;
  padding: 10px 20px;
  margin: 5px 0 0;
  background: #1a1a1a;
  color: #fff;
  font-size: 15px;
  border-radius: 5px;
`;
const TopAreaShow = styled.div`
  width: 38px;
  height: 30px;
  position: fixed;
  bottom: 50px;
  right: 50px;
  display: block !important;
  z-index: 500;
`;

// Todo 
// 1. DdText 하이퍼링크 색깔 흰색말고 검정색으로
// 2. FooterCont - margin-top이 내부에 적용이 안됨

const Footer = () => {
  return (
    <>
      <FooterCont>
        <FooterInner>
          <FooterArea>
            <InfoDl>
              <InfoDt>
                <DtSpan>DBZARA</DtSpan>
              </InfoDt>
              <InfoDd>
                <DivDd>
                  <DdTextFirst>
                    {/* <body link ="black" vlink ="red" alink = "darkgreen"> */}
                    <a href="http://company.yes24.com/" style={{ color: "#2b2b2b" }} target="_blank">회사소개</a>
                    {/* </body> */}
                  </DdTextFirst>
                  <DdText>
                    <a href="http://www.yes24.com/notice/service.aspx" target="_blank" style={{ color: "#2b2b2b" }}>이용약관</a>
                  </DdText>
                  <DdText>
                    <a href="http://www.yes24.com/notice/privacypolicy.aspx" target="_blank" style={{ color: "#2b2b2b" }}>개인정보처리방침</a>
                  </DdText>
                  <DdText>
                    <a href="http://www.yes24.com/notice/youthpolicy.aspx" target="_blank" style={{ color: "#2b2b2b" }}>청소년보호정책</a>
                  </DdText>
                  <DdText>
                    <a href="/Event/Movie_Prize_Result_Awards" style={{ color: "#2b2b2b" }}>공동체 영화상 CAMP</a>
                  </DdText>
                </DivDd>
                <AddrInfo>
                  <FcName>디비자라(주)</FcName>
                  <CallCont>한양대학교 ERICA 솦트웨어학부 (학연산클러스터 5층)</CallCont>
                  <CallCont>대표 : 누구게        개인정보보호책임자 : 노하준 hajoon0516@naver.com</CallCont>
                  <CallCont>사업자등록번호 : 229-81-37000   통신판매업신고 : 제 2005-02682호
                      <a href="https://www.ftc.go.kr/www/bizCommList.do?key=232" style={{ margin: "0 0 0 10px", borderBottom: "1px solid #a7a6a6", color: "#2b2b2b" }}>사업자 정보확인</a>
                  </CallCont>
                  <CallCont>Copyright  ⓒ YES24 Corp. All Rights Reserved.</CallCont>
                </AddrInfo>
              </InfoDd>
            </InfoDl>
          </FooterArea>
          <FooterCall>
            <FooterCallCont>
              <CallContTxt>모르면? 디비자라에 문의</CallContTxt>
              <a href="https://www.yes24.com/Mall/Help/CS/Apply" target="_blank">
                <InquiryLink>1:1문의 하기</InquiryLink>
              </a>
            </FooterCallCont>
            <TopAreaShow>
              <TopButton onClick={() => window.scrollTo(0, 0)}>최상단으로 이동</TopButton>
            </TopAreaShow>
          </FooterCall>
        </FooterInner>
      </FooterCont>
    </>
  );
};

const TopButton = styled(Button)`
  && {
    min-width: 38px;
    height: 30px;
    font-size: 0;
    background: url(//movie-img.yes24.com/NYes24/new/all_sprite.png) no-repeat -240px 0;
  }
`;


export default Footer;
