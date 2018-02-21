import * as types from '../constants'

export function increment() {
  return {
    type: types.INCREMENT_COUNTER
  }
}

export function decrement() {
  return {
    type: types.DECREMENT_COUNTER
  }
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState()

    if (counter % 2 === 0) {
      return
    }

    dispatch(increment())
  }
}

export function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment())
    }, 1000)
  }
}
