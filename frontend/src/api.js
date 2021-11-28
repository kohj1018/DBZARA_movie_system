import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "e3ffb6091393154ff4a81caaf0b29666",
    language: "ko",
  },
});

export const moviesApi = {
  popular: () => api.get("movie/popular"),
  popularPage: (num) => api.get("movie/popular", { params: { page: num } }),
  upComing: () => api.get("movie/upcoming"),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};

const DBZRapi = axios.create({
  baseURL: null, //준수baseURl,
});

export const DBZREventApi = {
  event: () => api.get(""),
};
