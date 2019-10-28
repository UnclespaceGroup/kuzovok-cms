import { combineReducers } from 'redux'

const userStore = (state = null, action) => {
  switch (action.type) {
    case 'loginUser':
      return action.payload || null
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  userStore
})