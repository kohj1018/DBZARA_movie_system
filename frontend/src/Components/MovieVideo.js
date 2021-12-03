import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dbzaraApi } from "dbzaraApi";

const Video = styled.iframe`
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  /* position: absolute; */
  background-color: black;
  /* overflow: hidden; */
`;

const MovieVideo = ({ id }) => {
  // Video Data
  let [moviesData, setMoviesData] = useState({
    result: null,
    error: null,
    loading: true,
  });

  async function DetailMoives() {
    try {
      const {
        data: { videos: result },
      } = await dbzaraApi.movieVideo(id);
      // 예고편 받아오기
      result.map((videos) =>
        videos.category === "Trailer"
          ? setMoviesData((moviesData) => ({
              ...moviesData,
              result: videos.video,
            }))
          : null
      );
      // console.log("moviesData", moviesData);
      // setMoviesData((moviesData) => ({ ...moviesData, result }));
    } catch {
      setMoviesData((moviesData) => ({ ...moviesData, error: "동영상 실패" }));
    } finally {
      setMoviesData((moviesData) => ({ ...moviesData, loading: false }));
    }
  }

  useEffect(() => {
    DetailMoives();
  }, []);

  return moviesData.loading
    ? moviesData.error
    : moviesData.result && (
        <Video
          src={
            moviesData.result
              ? `${moviesData.result}`
              : require("../assets/noPosterSmall.png").default
          }
          frameborder="0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
          {console.log("video id", id)}
          {/* {console.log("video result", moviesData.result)} */}
        </Video>
      );
};

export default MovieVideo;
