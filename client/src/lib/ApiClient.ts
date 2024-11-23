import axios from "axios";


console.log(import.meta.env.VITE_REST_API);

const ApiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default ApiClient;