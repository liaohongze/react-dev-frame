import * as types from '../constants'

const color = (state = 'red', action) => {
  switch (action.type) {
    case types.BLUE_COLOR:
      return 'blue'
    case 'CHANGE_COLOR':
      return action.color
    default:
      return state
  }
}

export default color