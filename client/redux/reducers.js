import { combineReducers } from 'redux'
import { setCookie } from '../middleware/auth'
import * as type from './types'

const initialState = {
  user: {},
  error: null,
  isLoading: false,
  isAuthenticated: false,
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.USER_LOGIN:
      return {
        ...state,
        isLoading: true,
      }
    case type.USER_LOGIN_SUCCESS:
      setCookie(action.payload.token)
      return {
        ...state,
        error: {},
        user: action.payload,
        isLoading: false,
        isAuthenticated: true
      }
      case type.USER_LOGIN_FAILED:
        return {
        ...state,
        error: action.payload,
        isLoading: false,
        isAuthenticated: true
      }
    default:
      return state
  }
}

const reducers = {
  login: loginReducer,
}

export default combineReducers(reducers)