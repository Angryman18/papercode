import axios from "axios";
const backendURL = process.env.REACT_APP_BACKEND_URL;

const graphqlQuery = async (query) => {
  try {
    const resp = await axios({
      url: backendURL,
      method: "POST",
      data: { query },
    });
    return resp.data;
  } catch (err) {
    return Promise.reject(err?.response?.data);
  }
};

export default graphqlQuery;
