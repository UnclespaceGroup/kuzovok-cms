import { JWT, USER_NAME } from 'constants/userConstants'

export const actionLogin = payload => {
  if (payload) {
    localStorage.setItem(JWT, payload.token)
    localStorage.setItem(USER_NAME, payload.name)
  } else {
    localStorage.removeItem(JWT)
    localStorage.removeItem(USER_NAME)
  }
  return {
    type: 'loginUser',
    payload
  }
}
