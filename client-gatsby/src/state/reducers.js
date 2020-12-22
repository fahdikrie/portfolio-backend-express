
import { combineReducers } from "redux"
import {
  userReducer,
  errorReducer
} from '../auth/reducer'

export default combineReducers({
  auth: userReducer,
  errors: errorReducer
})
