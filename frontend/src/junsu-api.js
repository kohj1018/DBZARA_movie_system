import axios from "axios";
import {useContext} from "react";
import {UserContext} from "./context";
import {useCookies} from "react-cookie";


const api = axios.create({ baseURL: "http://dbzara.kro.kr/api/v1/" });


export const socialAPI = {
  googleLogin: (response) =>
    api.post("accounts/login/google/", {
      results: response,
    }),
  kakaoLogin: (response) =>
    api.post("accounts/login/kakao/", {
      results: response,
    }),
  event: () => api.get('/event/'),
  profile: () => api.get('accounts/profile/'),
  preferActor: () => api.get('accounts/actors/'),
  preferDirector: () => api.get('accounts/directors/'),
  refreshToken: () => api.post('/token/refresh/', {
      token: api.defaults.headers.common['Authorization']
  }),
  createComment: (data) => api.post('/review/', data)
};

export const refreshToken = () => {
    const { data: token } = socialAPI.refreshToken();
    api.defaults.headers.common['Authorization'] = `JWT ${token}`;
}

export const setToken = (cookies) => {
    if (cookies.token) {
        api.defaults.headers.common['Authorization'] = `JWT ${cookies.token}`;
    }
}
