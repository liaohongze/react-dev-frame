import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { global } from './global'
import auth from './auth'
import counter from './counter'
import color from './color'

const rootReducer = combineReducers({
  routing,
  global,
  auth,
  counter,
  color
})

export default rootReducer