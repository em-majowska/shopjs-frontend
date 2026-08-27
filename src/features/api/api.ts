import axios from "axios";

const BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";
const TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

export default api;
