import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { moviesApi } from "api";

const Video = styled.iframe`
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  /* position: absolute; */
  background-color: black;
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
      const { data: result } = await moviesApi.movieDetail(id);
      setMoviesData((moviesData) => ({ ...moviesData, result }));
      console.log("vodie API", result);
      console.log("vodie title", result.title);
      console.log("vodie URL", result.videos.results[0].key);
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
            moviesData.result.videos
              ? `https://www.youtube.com/embed/${moviesData.result.videos.results[0].key}`
              : require("../assets/noPosterSmall.png").default
          }
          frameborder="0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
          {console.log("video id", id)}
          {console.log("video result", moviesData.result.videos.results)}
        </Video>
      );
};

export default MovieVideo;
