import axios from "axios";

const api = axios.create({
  baseURL: "http://dbzara.kro.kr/api/v1",
});

export const dbzaraApi = {
  // 영화data
  boxOffice: () =>
    api.get("movie/", {
      params: {
        option: "box-office",
      },
    }),
  notOpen: () =>
    api.get("movie/", {
      params: {
        option: "not-open",
      },
    }),
  movie: (id) => api.get(`movie/${id}`),
  movieInfo: (id) => api.get(`movie/${id}/info`),
  movieImg: (id) => api.get(`movie/${id}/images`),
  moviePeople: (id) => api.get(`movie/${id}/people`),
  movieReview: (id) => api.get(`movie/${id}/reviews`),
  movieVideo: (id) => api.get(`movie/${id}/videos`),

  //   시네마data
  cinema: () => api.get("cinema/"),

  //   스케줄data
  scheduleCinema: (cinemaId) => api.get(`/schedule/cinema/${cinemaId}`),
  scheduleMovie: (movieId) => api.get(`/schedule/movie/${movieId}`),
};