import axios from 'axios'
import cookie from 'js-cookie'

export const setToken = (token) => {
  localStorage.setItem("jwt", token)
}

export const setAxiosHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token
  } else {
    delete axios.defaults.headers.common["Authorization"]
  }
}

// const COOKIE_EXPIRATION_TIME = 1/48

// export const setCookie = (key, value) => {
//   if (process.browser) {
//       cookie.set(key, value, {
//           expires: COOKIE_EXPIRATION_TIME,
//           path: '/'
//       });
//   }
// }

// export const removeCookie = (key) => {
//   if (process.browser) {
//       cookie.remove(key, {
//           expires: COOKIE_EXPIRATION_TIME
//       });
//   }
// }

// export const getCookie = (key, req) => {
//   return process.browser
//       ? getCookieFromBrowser(key)
//       : getCookieFromServer(key, req);
// }


// const getCookieFromBrowser = key => {
//   return cookie.get(key);
// }


// const getCookieFromServer = (key, req) => {
//   if (!req.headers.cookie) {
//       return undefined;
//   }
//   const rawCookie = req.headers.cookie
//       .split(';')
//       .find(c => c.trim().startsWith(`${key}=`));
//   if (!rawCookie) {
//       return undefined;
//   }
//   return rawCookie.split('=')[1];
// }