import axios from 'axios'
import jwt_decode from 'jwt-decode'

import * as type from './types'
import {
  setToken,
  setAxiosHeader
} from '../utils/auth'
import {
  LOGIN_URL
} from '../utils/api'


export const login = (user) => {
  return (dispatch, getState) => {
    dispatch({ type: type.USER_LOGIN })
    axios
      .post(LOGIN_URL, user)
      .then(res => {
        setToken(res.data.token)
        setAxiosHeader(res.data.token)

        const decoded = jwt_decode(res.data.token)
        console.log(decoded)

        dispatch({
          payload: decoded,
          type: type.USER_LOGIN_SUCCESS
        })

        return true
      })
      .catch(err => {
        if (err.response) {
          dispatch({
            payload: err.response.data,
            type: type.USER_LOGIN_FAILED
          })
        }
      })
  }
}