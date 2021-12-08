import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useCookies} from "react-cookie";
import {socialAPI} from "../junsu-api";

const RateEditBox = ({rates, movie})  => {
  const [cookies, setCookies] = useCookies(['token']);
  const [comment, setComment] = useState('');
  const handleComment = ({ target: { value } }) => setComment(value);
  console.log("movie", movie);

  const onSubmit = async (event) => {
    event.preventDefault();
    if(cookies.token) {
      const data = {
        movie: movie,
        score: userRate,
        comment: comment
      }
      try {
        const { results } = await socialAPI.createComment(data);
      }
      catch (e) {
        alert('이미 생성한 리뷰가 존재합니다.')
      }
    } else {
      alert('등록하기 위해서는 로그인이 필요합니다.')
    }
  }

  // 사용자가 매긴 평점
  const [userRate, setUserRate] = useState(-1);

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

  useEffect(() => {
    fillStar(userRate);
    // console.log(userRate);
  }, [userRate])

  const fillStar = (idx) => {
    for (i = 0; i <= idx; i++) {
      document.getElementById(i).style.width='100%';
    }
    if (idx < 4) {
      for (i = idx + 1; i <= 4; i++) {
        document.getElementById(i).style.width='0%';
      }
    }
  }

  return (
    <>
      <EditBox>
        <ContBox>
          <ContTop>
            <ContTit>나의 평점</ContTit>
            <BigStarArea>
              {[0,1,2,3,4].map(idx => {
                  return (
                    <BigIcStar onClick={() => setUserRate(idx)}>
                      <BgStar id={idx}/>
                      <BgStar/>
                    </BigIcStar>
                  )
              })}
            </BigStarArea>
            <ContTit02>종합 평점</ContTit02>
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
              <StarNum>{rates}</StarNum>
            </StarArea>
          </ContTop>
          <ContBottom onSubmit={onSubmit}>
            <InputArea
              placeholder="별점을 먼저 선택하신 후, 감상을 남겨주세요.
              욕설, 비속어, 타인을 비방하는 문구를 사용하시면 운영자가 임의로 삭제할 수 있으며 스포일러가 포함된 경우 체크해주세요.
              최대 1,500자 작성가능(공백포함)"
              type="textarea"
              onChange={handleComment}
              value={comment}
            />
            <RateAddBtn onClick={onSubmit}>등록</RateAddBtn>
          </ContBottom>
        </ContBox>
      </EditBox>
    </>
  );
};

export default RateEditBox;

const EditBox = styled.div`
  display: block;
  margin-bottom: 8px;
  padding: 0;
  border: 1px solid #e5e5e5;
  background: #fff;
`;

const ContBox = styled.div`
  position: relative;
`;

const ContTop = styled.div`
  padding: 0 30px;
  height: 66px;
  font-size: 0;
  border-bottom: 1px solid #e5e5e5;
`;

const ContTit = styled.span`
  margin-top: 0;
  padding-top: 26px;
  height: 100%;
  margin: 3px 13px 0 0;
  display: inline-block;
  vertical-align: top;
  font-size: 13px;
  color: #2b2b2b;
`;

const ContTit02 = styled.span`
  padding-left: 30px;
  border-left: 1px solid #e9e9e9;
  margin-top: 0;
  padding-top: 26px;
  height: 100%;
  margin: 3px 13px 0 0;
  display: inline-block;
  vertical-align: top;
  font-size: 13px;
  color: #2b2b2b;
`;

const BigStarArea = styled.div`
  padding-top: 17px;
  margin-right: 30px;
  display: inline-block;
  vertical-align: top;
  font-size: 0;
`;

const StarArea = styled.div`
  margin-right: 30px;
  padding-top: 24px;
  display: inline-block;
  vertical-align: top;
  font-size: 0;
`;

const BigIcStar = styled.span`
  :first-child {
    margin-left: 0;
  }
  margin-left: 3px;
  display: inline-block;
  vertical-align: top;
  width: 28px;
  height: 28px;
  cursor: pointer;
  position: relative;
  background: #ccc;
  :after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url(//movie-img.yes24.com/NYes24/new/bg_star_b.png) no-repeat 0 0;
  }
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

const StarNum = styled.span`
  margin-left: 7px;
  font-size: 18px;
  color: #2b2b2b;
  font-family: nanumB,'맑은 고딕','Malgun Gothic','Helvetica','Apple SD Gothic Neo',AppleGothic,'돋움',Dotum,'굴림',Gulim,Helvetica,sans-serif;
`;

const ContBottom = styled.form`
  padding: 30px 180px 30px 30px;
  position: relative;

`;

const InputArea = styled.input`
  width: 100%;
  height: 70px;
  border: none;
  line-height: 21px;
  font-size: 14px;
  font-family: nanumBa,'맑은 고딕','Malgun Gothic','Helvetica','Apple SD Gothic Neo',AppleGothic,'돋움',Dotum,'굴림',Gulim,Helvetica,sans-serif;
  resize: none;
`;

const RateAddBtn = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 146px;
  font-size: 18px;
  color: #fff;
  background: #ec6159;
  cursor: pointer;
  border: none;
`;