import { initialize } from 'passport'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from "redux-thunk"

import reducers from './reducers'

const initialState = {}
const middleware = [thunk]
const composeEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
  (
   (
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
   ) || compose
  )
)

const store = createStore(
  reducers,
  initialState,
  composeEnhancers
)

export default store

// export default preloadedState => {
//   return createStore(
//     reducers,
//     preloadedState,
//     composeEnhancers
//   )
// }


// import { createStore } from 'redux'
// import reducers from './reducers'

// // preloadedState will be passed in by the plugin
// export default preloadedState => {
//   return createStore(reducers, preloadedState);
// };