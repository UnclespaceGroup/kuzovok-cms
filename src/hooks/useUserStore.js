import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

const userKey = 'user-data'

const useUserStore = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userStore)

  useEffect(() => {
    const data = Cookies.getJSON(userKey)
    dispatch({
      type: 'loginUser',
      payload: data || null
    })
  }, [dispatch])

  const initialization = () => {
    const data = Cookies.getJSON(userKey)
    if (data) {
      dispatch({
        type: 'loginUser',
        payload: data
      })
    }
  }

  const logIn = (data) => {
    dispatch({
      type: 'loginUser',
      payload: data
    })
    Cookies.set(userKey, data)
  }

  const logOut = () => {
    dispatch({
      type: 'loginUser',
      payload: null
    })
    Cookies.set(userKey, null)
  }

  return {
    logIn,
    logOut,
    user,
    initialization,
    accessString: user && user.token
  }
}

export default useUserStore
