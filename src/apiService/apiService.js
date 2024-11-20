import axios from "axios";


const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// verify JWT access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = "/"
        }
        return Promise.reject(error)
    }
)

const apiService = {
  get: (url, params, options = {}) => api.get(url, { params, ...options }),
  post: (url, data, options = {}) => api.post(url, data, options),
  put: (url, data, options = {}) => api.put(url, data, options),
  patch: (url, data, options = {}) => api.patch(url, data, options),
  delete: (url, options = {}) => api.delete(url, options),
};

export default apiService;

