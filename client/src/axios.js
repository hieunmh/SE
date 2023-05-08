import axios from "axios";

window.axios = axios;

axios.defaults.withCredentials = false;

let serverUrl =
  process.env.NODE_ENV == "production"
    ? process.env.VUE_APP_SERVER_HOST_PRO
    : process.env.VUE_APP_SERVER_HOST_DEV;
axios.defaults.baseURL = serverUrl;

export default serverUrl;