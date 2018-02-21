import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'
import api from '../middleware/api'
import DevTools from '../containers/Devtools'

export default function configureStore(history, initialState) {
  const logger = createLogger()
  const router = routerMiddleware(history)

  const createStoreWithMiddleware = applyMiddleware(
    router,
    thunk,
    api,
    logger
  )(createStore)

  const store = createStoreWithMiddleware(
    rootReducer,
    initialState,
    DevTools.instrument()
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default)
    })
  }

  return store
}