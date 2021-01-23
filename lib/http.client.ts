import axios from "axios";

axios.interceptors.request.use(async (config) => {
  config.withCredentials = true;
  return config;
});
export const httpClient = axios;
