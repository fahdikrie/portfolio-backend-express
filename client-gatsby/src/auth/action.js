import axios from "axios"
import jwt_decode from "jwt-decode"

import setToken from "./token"
import {
  LOGIN_URL
} from "../api/api"
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./constant";

export const loginUser = userData => dispatch => {
  axios
    .post(LOGIN_URL, userData)
    // .post('/api/users/login', userData)
    .then(res => {
      console.log("success!", res.data)

      const { token } = res.data
      localStorage.setItem("jwtToken", token)
      setToken(token)

      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => {
      console.log("failed!", err)
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    })
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}


export const setUserLoading = () => {
  return {
    type: USER_LOADING
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken")
  setToken(false)
  dispatch(setCurrentUser({}))
}
