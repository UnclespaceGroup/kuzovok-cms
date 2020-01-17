import useUserStore from 'hooks/useUserStore'
import { useEffect } from 'react'
import PageLogin from 'pages/PageLogin/PageLogin'

const usePrivatePage = (Component) => {


  return user
    ? Component
    : PageLogin
}
export default usePrivatePage
