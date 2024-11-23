import axios from "axios";


console.log(import.meta.env.VITE_REST_API);

const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_REST_API+"/api",
  withCredentials: true,
});

export default ApiClient;