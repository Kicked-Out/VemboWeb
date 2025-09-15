import axios from "axios";
import { getToken } from "../helpers/localStorage.helper";

const urlAPI = "https://localhost:7213/api/Auth/";

export const instance = axios.create({
    baseURL: urlAPI,
    withCredentials: false,
});

instance.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            return Promise.resolve({ data: null, status: 401 });
        }

        if (error.response?.status === 404) {
            return Promise.resolve({ data: null, status: 404 });
        }

        return Promise.reject(error);
    }
);
