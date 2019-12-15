import { useDispatch, useSelector } from 'react-redux'
import { USER_STORAGE } from '../constants/OTHER'

const useUserStore = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userStore)

  const initialization = () => {
    const data = localStorage.getItem(USER_STORAGE)
    if (data) {
      dispatch({
        type: 'loginUser',
        payload: safeParsing(data)
      })
    }
  }

  const logIn = (data) => {
    dispatch({
      type: 'loginUser',
      payload: data
    })
    localStorage.setItem(USER_STORAGE, JSON.stringify(data))
  }

  const logOut = () => {
    dispatch({
      type: 'loginUser',
      payload: null
    })
    localStorage.setItem(USER_STORAGE, null)
  }

  return {
    logIn,
    logOut,
    user,
    initialization,
    accessString: user && user.token
  }
}

const safeParsing = (data) => {
  try {
    return JSON.parse(data)
  }
  catch (e) {
    console.log(e)
  }
}

export default useUserStore
