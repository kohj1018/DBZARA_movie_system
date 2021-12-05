import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import movieData from "movieData";
import PeopleView from "Components/PeopleView";
import RateEditBox from "Components/RateEditBox";
import RateViewBox from "Components/RateViewBox";
import People from "./People";
import { Translate } from "@material-ui/icons";

const Default = ({ id }) => {
  // 사진 카로셀(슬라이더) 설정
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // nextArrow: <CustomNextArrow/>,
    // prevArrow: <CustomPrevArrow/>
  };

  return (
    <>
      <Container>
        <Title>시놉시스</Title>
        {movieData[id].sysTxt.map((txt) => {
          return <Txt>{txt}</Txt>;
        })}
        <Title>제작정보</Title>
        <Txt>수입 : {movieData[id].studio}</Txt>
        <Txt>배급 : {movieData[id].distributor}</Txt>
        <Title>배우·제작진</Title>
        <ActArea>
          {movieData[id].people.map((people) => {
            return (
              <PeopleView
                // name={people.name}
                // job={people.job}
                // src={people.src}
                {...people}
              />
            );
          })}
        </ActArea>
        <Title>동영상</Title>
        <VodArea>
          <Video
            src={movieData[id].video}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </VodArea>
        <Title>포토</Title>
        <StyledSlider {...settings}>
          {movieData[id].photos.map((photo, index) => {
            return (
              <PhotoItem>
                <Photo src={photo} />
              </PhotoItem>
            );
          })}
        </StyledSlider>
        <Title>동영상</Title>
        <VodArea>
          <Video
            src={movieData[id].video}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </VodArea>
        <Title>포토</Title>
        <StyledSlider {...settings}>
          {movieData[id].photos.map((photo, index) => {
            return (
              <PhotoItem>
                <Photo src={photo} />
              </PhotoItem>
            );
          })}
        </StyledSlider>
        <Title>평점</Title>
        <CommentArea>
          <RateEditBox rates={movieData[id].rates} />
          <RatesArea>
            <RatesTypeMenuTxt>
              <EmpathyOrder>공감순</EmpathyOrder>
              <LatestOrder>최신순</LatestOrder>
            </RatesTypeMenuTxt>
          </RatesArea>
          <RatesView>
            {movieData[id].review.map((review) => {
              return (
                <RateViewBox
                  // nickName={review.nickName}
                  // rates={review.rates}
                  // comment={review.comment}
                  // date={review.date}
                  {...review}
                />
              );
            })}
          </RatesView>
        </CommentArea>
      </Container>
    </>
  );
};

export default Default;

const Container = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;

  display: block;
  color: #777;
`;

const Title = styled.p`
  :first-child {
    margin-top: 70px;
  }
  margin: 120px 0 20px;
  position: relative;
  font-size: 20px;
  color: #2b2b2b;
`;

const Txt = styled.p`
  line-height: 24px;
  font-size: 15px;
`;

const ActArea = styled.div`
  padding-top: 30px;
`;

const VodArea = styled.div`
  margin-top: 20px;
  position: relative;
  width: 100%;
  height: 660px;
  overflow: hidden;
  background: #000;
`;

const Video = styled.iframe`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const StyledSlider = styled(Slider)`
  .slick-slider {
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .slick-initialized {
    position: relative;
    display: block;
    box-sizing: border-box;
    user-select: none;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
  }

  .slick-arrow {
    top: 50%;
    transform: translate(0, -50%);
    position: absolute;
    display: block;
    width: 90px;
    height: 90px;
    font-size: 0;
    background: url(//movie-img.yes24.com/NYes24/new/all_sprite.png) no-repeat 0
      0;
    z-index: 3;
    cursor: pointer;
  }

  .slick-prev {
    left: 0;
    border: none;
  }

  .slick-next {
    right: 0;
    background-position: -120px 0;
    border: none;
  }

  .slick-list {
    transform: translate3d(0, 0, 0);
    position: relative;
    display: block;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  .slick-track {
    opacity: 1;
    width: 9600px;
    position: relative;
    top: 0;
    left: 0;
    display: block;
    margin-left: auto;
    margin-right: auto;
    transform: translate3d(0, 0, 0);
    :before {
      content: "";
      display: table;
    }
    :after {
      clear: both;
      display: table;
      content: "";
    }
  }

  .slick-slide {
    width: 1200px;
    position: relative;
    top: 0px;
    z-index: 998;
    transition: opacity 500ms ease 0s;
    display: block;
    float: left;
    height: 100%;
    min-height: 1px;
  }
`;

const PhotoItem = styled.div`
  width: 100%;
  display: inline-block;
  height: 500px;
  background: #000;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const Photo = styled.img`
  margin: auto;
  height: 100%;
  display: block;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
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
    content: "";
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
    content: "";
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
