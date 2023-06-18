import { GAME_URL, PHPSESSID } from "../constants.js";
import { getRandom } from './random.js';

const getFullUrl = (url) => `${GAME_URL}${url}`;

const makeRequest = (url, options) => {
  if (!PHPSESSID) {
    throw new Error('VOID PHPSESSID');
  }
  return fetch(getFullUrl(url), {
    "credentials": "include",
    "method": "GET",
    "mode": "cors",
    ...options,
    "headers": {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-User": "?1",
      "Pragma": "no-cache",
      "Cache-Control": "no-cache",
      "cookie": `PHPSESSID=${PHPSESSID}; perm_login=1; duration=19841; duration2=20848; mot_7374026=0; combat_engine6zz=1; combat_fps6zz=49; hwm_mob_or_support=0; pl_id=7374026`,
      ...options?.headers,
    },
  });
};

let lastReferrer = '';

export const makeRequestText = async (url, options) => {
  const optionsEnhanced = {
    ...options,
  }
  if (lastReferrer) {
    optionsEnhanced.referrer = lastReferrer;
  }
  lastReferrer = getFullUrl(url);

  const [response] = await Promise.all([
    makeRequest(url, optionsEnhanced),
    new Promise(r => setTimeout(r, getRandom(1000, 3000)))
  ]);
  const buffer = await response.arrayBuffer();
  return new TextDecoder('windows-1251').decode(buffer);
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
