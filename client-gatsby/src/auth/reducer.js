import {
  SET_CURRENT_USER,
  USER_LOADING,
  GET_ERRORS
} from "./constant"

const isEmpty = require("is-empty")
const initialUserState = {
  isAuthenticated: false,
  user: {},
  loading: false
}

export const userReducer = (
  state = initialUserState,
  action
) => {

  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case USER_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }

}

const initialErrorState = {}

export const errorReducer = (
  state = initialErrorState,
  action
) => {

  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }

}