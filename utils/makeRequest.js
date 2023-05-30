import { GAME_URL, PHPSESSID } from "../constants.js";

const makeRequest = (url, options) => {
  return fetch(`${GAME_URL}${url}`, {
    ...options,
    referrerPolicy: "strict-origin-when-cross-origin",
    mode: "cors",
    credentials: "include",
    headers: {
      ...options?.headers,
      cookie: `PHPSESSID=${PHPSESSID}`,
    },
  });
};

export const makeRequestText = async (url, options) => {
  const response = await makeRequest(url, options);
  return response.text();
};

export const makeRequestJson = async (url, options) => {
  const response = await makeRequest(url, {
    ...options,
    headers: {
      ...options?.headers,
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  });
  return response.json()
};
