import axios from "axios";

const API = process.env.REACT_APP_BASE_URL;
const instance = axios.create({
  baseURL: API,
});

export default instance;
