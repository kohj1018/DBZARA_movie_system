import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
});

export const socialAPI = {
    googleLogin: (response) => api.post('accounts/login/google/', {
        results: response
    }),
    kakaoLogin: (response) => api.post('accounts/login/kakao/', {
        results: response
    })
};