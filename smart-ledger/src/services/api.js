import axios from "axios";

export const API_BASE_URL = "http://127.0.0.1/ecommerce-billing/smart-ledger-backend/api/";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Keep JSON content-type for normal object payloads,
// but let Axios set multipart boundaries automatically for FormData.
api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    if (config.headers) {
      delete config.headers["Content-Type"];
    }
  } else {
    if (config.headers) {
      config.headers["Content-Type"] = "application/json";
    }
  }
  return config;
});

export default api;