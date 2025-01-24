import axios from "axios";

const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_REST_API,
  withCredentials: true,
});

export default ApiClient;