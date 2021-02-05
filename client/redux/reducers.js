import { combineReducers } from 'redux'
import {  } from '../utils/auth'
import * as type from './types'

const initialState = {
  user: {},
  errors: null,
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
      return {
        ...state,
        errors: {},
        user: action.payload,
        isLoading: false,
        isAuthenticated: true
      }
      case type.USER_LOGIN_FAILED:
        return {
        ...state,
        errors: action.payload,
        isLoading: false,
        isAuthenticated: false
      }
    default:
      return state
  }
}

const reducers = {
  login: loginReducer,
}

export default combineReducers(reducers)