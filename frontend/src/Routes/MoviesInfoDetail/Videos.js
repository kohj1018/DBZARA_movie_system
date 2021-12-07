import React, { useState, useEffect } from "react";
import styled from "styled-components";
import movieData from "movieData";
import { CircularProgress } from "@material-ui/core";
import { dbzaraApi } from "dbzaraApi";

const Videos = ({ id }) => {
  const [movieVideo, setMovieVideo] = useState();

  const getMovieVideo = async () => {
    const { data: { videos: movieVideo } } = await dbzaraApi.movieVideo(id);
    setMovieVideo(() => movieVideo);
  }

  useEffect(() => {
    getMovieVideo();
  }, [])
  return (
    movieVideo ? (
      <>
        <Container>
          <Title>동영상</Title>
          <VodArea>
            {/* <Video
              poster={movieData[id].videoThumb}
              controlslist="nodownload"
              preload="none"
              src={movieData[id].video} disablepictureinpicture
            /> */}
            <Video 
              src={movieVideo[0].video} 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
            />
            {/* <BannerInfo>
              <PlayBtn/>
              <BannerTxt>
                <VodTitle>{movieData[id].title}</VodTitle>
                <VodType>메인 예고편</VodType>
              </BannerTxt>
            </BannerInfo> */}
          </VodArea>
        </Container>
      </>
    ) : (
      <>
        <LoadingArea>
          <CircularProgress/>
        </LoadingArea>
      </>
    )
)};

export default Videos;


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

const LoadingArea = styled.div`
  margin: 400px auto 300px;
  width: 1200px;
  text-align: center;
`;

// const BannerInfo = styled.div`
//   position: absolute:
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   text-align: left;
//   :before {
//     content: '';
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     height: 230px;
//     background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.35));
//   }
// `;

// const PlayBtn = styled.button`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   z-index: 2;
//   width: 77px;
//   height: 77px;
//   background: url('//movie-img.yes24.com/NYes24/new/all_sprite.png') no-repeat 0 -520px;
//   font-size: 0;
//   text-indent: -9999px;
//   border: none;
// `;

// const BannerTxt = styled.div`
//   position: absolute;
//   bottom: 50px;
//   left: 50px;
//   font-size: 0;
//   color: #fff;
//   z-index: 2;
//   padding-right: 50px;
//   line-height: 1;
// `;

// const VodTitle = styled.p`
//   margin-bottom: 20px;
//   font-size: 40px;
//   line-height: 48px;
//   font-family: nanumEB,'맑은 고딕','Malgun Gothic','Helvetica','Apple SD Gothic Neo',AppleGothic,'돋움',Dotum,'굴림',Gulim,Helvetica,sans-serif;
//   letter-spacing: -1px;
// `;

// const VodType = styled.p`
//   font-size: 19px;
// `;