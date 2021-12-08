import axios from "axios";

const api = axios.create({
  baseURL: "http://dbzara.kro.kr/api/v1",
});

export const dbzaraApi = {
  // 영화data
  boxOffice: (pageNum) =>
    api.get("movie/", {
      params: {
        option: "box-office",
        page: pageNum
      },
    }),
  reviewRating: (pageNum) =>
    api.get("movie/", {
      params: {
        option: "review",
        page: pageNum
      },
    }),
  notOpen: (pageNum) =>
    api.get("movie/", {
      params: {
        option: "not-open",
        page: pageNum
      },
    }),
  movie: (id) => api.get(`movie/${id}`),
  movieInfo: (id) => api.get(`movie/${id}/info`),
  movieImg: (id) => api.get(`movie/${id}/images`),
  moviePeople: (id) => api.get(`movie/${id}/people`),
  movieVideo: (id) => api.get(`movie/${id}/videos`),

  // review CRUD
  movieReview: (id) => api.get(`movie/${id}/reviews`),
  reviewPost: (score, comment) => 
    api.post("review/", {
      score: score,
      comment: comment,
      sympathy: 0,
      not_sympathy: 0
    }),
  reviewDelete: (id) => api.delete(`review/${id}`),

  //  배우data
  actor: (id) => api.get(`actor/${id}`),

  //   시네마data
  cinema: () => api.get("cinema/"),

  //   스케줄data
  scheduleCinema: (cinemaId) => api.get(`/schedule/cinema/${cinemaId}`),
  scheduleMovie: (movieId) => api.get(`/schedule/movie/${movieId}`),
};