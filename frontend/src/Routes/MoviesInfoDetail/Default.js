import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import movieData from "movieData";
import PeopleView from "Components/PeopleView";
import RateEditBox from "Components/RateEditBox";
import RateViewBox from "Components/RateViewBox";
import { dbzaraApi } from "dbzaraApi";
import { CircularProgress } from "@material-ui/core";

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

  // API 연동
  const [movie, setMovie] = useState();
  const [movieInfo, setMovieInfo] = useState();
  const [movieImg, setMovieImg] = useState();
  const [moviePeople, setMoviePeople] = useState();
  const [movieVideo, setMovieVideo] = useState();
  const [movieReview, setMovieReview] = useState();
  const getMovie = async () => {
    const { data: movie } = await dbzaraApi.movie(id);
    setMovie(() => movie);
  }
  const getMovieInfo = async () => {
    const { data: { results: movieInfo } } = await dbzaraApi.movieInfo(id);
    setMovieInfo(() => movieInfo);
  }
  const getMovieImg = async () => {
    const { data: { images: movieImg } } = await dbzaraApi.movieImg(id);
    setMovieImg(() => movieImg);
  }
  const getMoviePeople = async () => {
    const { data: { actors: moviePeople } } = await dbzaraApi.moviePeople(id);
    setMoviePeople(() => moviePeople);
  }
  const getMovieVideo = async () => {
    const { data: { videos: movieVideo } } = await dbzaraApi.movieVideo(id);
    setMovieVideo(() => movieVideo);
  }
  const getMovieReview = async () => {
    const { data: { results: movieReview } } = await dbzaraApi.movieReview(id);
    setMovieReview(() => movieReview);
  }

  useEffect(() => {
    getMovie();
    getMovieInfo();
    getMovieImg();
    getMoviePeople();
    getMovieReview();
    getMovieVideo();
  }, [])

  return (
    movie && moviePeople && movieVideo && movieImg && movieReview ? (
      <>
        <Container>
          <Title>시놉시스</Title>
          <Txt>
            {movie.summary}
          </Txt>
          <Title>제작정보</Title>
          <Txt>수입 : {movie.distributors[0] ? movie.distributors[0].name : ""}</Txt>
          <Txt>배급 : {movie.distributors[0] ? movie.distributors[1] ? movie.distributors[1].name : movie.distributors[0].name : ""}</Txt>
          <Title>배우·제작진</Title>
          <ActArea>
            {moviePeople.map(people => {
              return (
                <PeopleView
                  id={people.actor.id}
                  name={people.actor.name}
                  job={"배우"}
                  src={people.actor.image}
                />
              )
            })}
          </ActArea>
          <Title>동영상</Title>
          <VodArea>
            <Video
              src={movieVideo[0] ? movieVideo[0].video : ""}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
            />
          </VodArea>
          <Title>포토</Title>
          <StyledSlider {...settings}>
            {movieImg.map((photo, index) => {
              return (
                <PhotoItem>
                  <Photo
                    src={photo.image}
                  />
                </PhotoItem>
              )
            })}
          </StyledSlider>
          <Title>평점</Title>
          <CommentArea>
            <RateEditBox
              rates={movieData[0].rates}
              movie={id}
            />
            <RatesArea>
              <RatesTypeMenuTxt>
                <EmpathyOrder>공감순</EmpathyOrder>
                <LatestOrder>최신순</LatestOrder>
              </RatesTypeMenuTxt>
            </RatesArea>
            <RatesView>
              {movieReview.map(review => {
                return (
                  <RateViewBox
                    nickName={review.name}
                    rates={review.score}
                    comment={review.comment}
                    date={review.created.slice(0, 10)}
                    // nickName={review.nickName}
                    // rates={review.rates}
                    // comment={review.comment}
                    // date={review.date}
                    // {...review}
                  />
                )
              })}
            </RatesView>
          </CommentArea>
        </Container>
      </>
    ) : (
      <>
        <LoadingArea>
          <CircularProgress />
        </LoadingArea>
      </>
    )
  )
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

const LoadingArea = styled.div`
  margin: 400px auto 300px;
  width: 1200px;
  text-align: center;
`;
