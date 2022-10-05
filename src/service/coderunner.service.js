import axios from "axios";

export const registerExecutionToken = async (data) => {
  // data: '{"language_id":52,"source_code":"print(\'Hello World\')"}';

  const options = {
    method: "POST",
    url: process.env.REACT_APP_CODERUNNER_ENDPOINT,
    params: { base64_encoded: "true", wait: "true" },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.REACT_APP_X_RAPID_APIKEY,
      "X-RapidAPI-Host": process.env.REACT_APP_X_RAPID_APIHOST,
    },
    data,
  };

  const response = await axios.request(options).catch((err) => Promise.reject(err?.response));
  return Promise.resolve(response.data);
};

export const tokenToOutput = async (token) => {
  const options = {
    method: "GET",
    url: process.env.REACT_APP_CODERUNNER_ENDPOINT + token,
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_X_RAPID_APIKEY,
      "X-RapidAPI-Host": process.env.REACT_APP_X_RAPID_APIHOST,
    },
  };
  const response = await axios.request(options).catch((err) => Promise.reject(err?.response));
  return Promise.resolve(response.data);
};
