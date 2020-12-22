import axios from 'axios'
import * as type from './types'
import {
  LOGIN_URL
} from '../public/api'

export const login = (user) => {
  return (dispatch) => {
    dispatch({ type: type.USER_LOGIN })
    axios
      .post(LOGIN_URL, user)
      .then(res => {
        console.log("action!")
        console.log(res)

        dispatch({
          payload: res.data,
          type: type.USER_LOGIN_SUCCESS
        })
      })
      .catch(err => {
        console.log("error action!", err)
        dispatch({
          payload: err,
          type: type.USER_LOGIN_FAILED
        })
      })
  }
}