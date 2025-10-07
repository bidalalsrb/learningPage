import axios from "axios";

const api = axios.create({
    baseURL: "http://3.37.89.229:8080/",
    // baseURL: "http://localhost:8080/",
});

// 요청 인터셉터 (JWT 토큰 자동 추가)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
        if (!config.headers) config.headers = {};
        if (typeof config.headers.set === "function") {
            config.headers.set("Authorization", `Bearer ${token}`);
        } else {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    const isAxiosHeaders = typeof config.headers?.set === "function";

    if (config.data instanceof FormData) {
        if (isAxiosHeaders) {
            config.headers.delete("Content-Type");
        } else if (config.headers?.["Content-Type"]) {
            const headersCopy = { ...config.headers };
            delete headersCopy["Content-Type"];
            config.headers = headersCopy;
        }
    } else if (!isAxiosHeaders && !config.headers?.["Content-Type"]) {
        config.headers = {
            ...config.headers,
            "Content-Type": "application/json",
        };
    }
    return config;
});

export default api;
