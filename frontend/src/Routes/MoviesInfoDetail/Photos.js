import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import movieData from "movieData";

const Photos = ({ match }) => {
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
      <Title>포토</Title>
      <StyledSlider {...settings}>
        {movieData[match.params.id].photos.map((photo, index) => {
          return (
            <PhotoItem>
              <Photo
                src={photo}
              />
            </PhotoItem>
          )
        })}
      </StyledSlider>
    </Container>
  </>
)};

export default Photos;


const Container = styled.div`
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
    box-sizing: border-box;
    display: block;
    color: #777;
`;

const Title = styled.p`
  margin: 70px 0 20px;
  position: relative;
  font-size: 20px;
  color: #2b2b2b;
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
    background: url(//movie-img.yes24.com/NYes24/new/all_sprite.png) no-repeat 0 0;
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
      content: '';
      display: table;
    }
    :after {
      clear: both;
      display: table;
      content: '';
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