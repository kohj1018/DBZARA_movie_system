import axios from "axios";

const api = axios.create({
  baseURL: "http://dbzara.kro.kr/api/v1",
});

export const dbzaraApi = {
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
  movieInfo: (id) => api.get(`movie/${id}`),
  movieVideo: (id) => api.get(`movie/${id}/videos`),

  moviesList: () =>
    api.get(`schedule/`, {
      params: {
        option: "sub",
      },
    }),

  //   시네마data
  cinema: () => api.get("cinema/"),

  //   스케줄data
  scheduleCinema: (cinemaId) => api.get(`/schedule/cinema/${cinemaId}`),
  scheduleMovie: (movieId) => api.get(`/schedule/movie/${movieId}`),
};
