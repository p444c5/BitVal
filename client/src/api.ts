import Axios, { type AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from "axios";

//switch between debug/development mode(local) and production base url
const isLocal = import.meta.env.VITE_LOCAL === 'true';
const baseURL = isLocal ? (import.meta.env.VITE_LOCAL_HOST ?? "http://localhost:8000/api") 
                        : (import.meta.env.VITE_BASE_URL ?? "https://tobeadded/api");

const api = Axios.create({
  withCredentials: true,
  timeoutErrorMessage: "Takes too long to respond",
  baseURL: baseURL,
  headers: {
    "Accept": "application/json",
  },
// timeout: 1000*60*1.2, // timeout for requests will be added when needed
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let accessToken: string | null = null; 

export const setAccessToken = (token: string | null) :void => {
    accessToken = token;
    if (token) {
        localStorage.setItem('isAuthenticated', 'true');
    } else {
        localStorage.removeItem('isAuthenticated');
    }
};

export const getAccessToken = () : string | null => accessToken;


/*Request interceptor to attach the JWT token*/
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    } 
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);


/*Response Interceptor for Refresh Flow*/
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig | undefined;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        // Ignores login endpoint 
        if (originalRequest.url?.includes('/auth/login')) {
            return Promise.reject(error);
        }

        // Ignores token refresh endpoint (if refresh itself fails, log out)
        if (originalRequest.url?.includes('/auth/refresh')) {
            setAccessToken(null);
            window.location.href = '/admin/login';
            return Promise.reject(error);
        }

        if ((error.response?.status === 403 || error.response?.status === 401) && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await api.post<{accessToken: string}>('/auth/refresh'); 
                const newAccessToken = res.data.accessToken;

                setAccessToken(newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                setAccessToken(null);
                window.location.href = '/admin/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;



