import Axios from "axios";

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


export default api;


