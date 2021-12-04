import axios from "axios";

const api = axios.create({
    baseURL: "http://dbzara.kro.kr/api/v1",
});

export const dbzaraApi = {
    boxOffice: () => api.get("movie/", {
        params: {
        option: 'box-office'
        }
    }),
    notOpen: () => api.get("movie/", {
        params: {
        option: 'not-open'
        }
    }),
    movieInfo: (id) => api.get(`movie/${id}`)
};