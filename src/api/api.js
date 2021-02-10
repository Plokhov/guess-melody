import axios from "axios";

const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://5.react.pages.academy/guess-melody`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  return api;
};

export default createAPI;
