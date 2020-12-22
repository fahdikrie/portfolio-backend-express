// /* eslint-disable sort-keys, valid-jsdoc, lines-around-comment */

// import axios from "axios";

// const auth = {
//   /**
//    * Logs a user in, returning a promise with `true` when done
//    */
//   login(user) {
//     if (auth.loggedIn()) {
//       return Promise.resolve(true);
//     }

//     localStorage = JSON.stringify(user);

//     return Promise.resolve(true);
//   },

//   /**
//    * Logs the current user out
//    */
//   logout() {
//     localStorage.removeItem("pmb2020");
//     Reflect.deleteProperty(axios.defaults.headers.common, "Authorization");
//   },

//   /**
//    * Checks if a user is logged in
//    */
//   loggedIn() {
//     const notUser = Boolean(localStorage.pmb2020);

//     return notUser ? JSON.parse(localStorage.pmb2020) : false;
//   },
// };

// export default auth;
