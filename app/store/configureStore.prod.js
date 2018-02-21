import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'
import api from '../middleware/api'

export default function configureStore(history, initialState) {
  const router = routerMiddleware(history)

  const createStoreWithMiddleware = applyMiddleware(
    router,
    thunk,
    api
  )(createStore)

  return createStoreWithMiddleware(
    rootReducer,
    initialState
  )
}