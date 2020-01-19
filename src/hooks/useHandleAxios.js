import { useState } from 'react'
import { getAxiosInstance } from 'axiosFetch/index'
import useUserStore from 'hooks/useUserStore'
import { useHistory } from 'react-router'

const STATUS_ERROR = 'STATUS_ERROR'
const STATUS_SUCCESS = 'STATUS_SUCCESS'
const STATUS_PENDING = 'STATUS_PENDING'

const useHandleAxios = ({
  url,
}) => {
  const { accessString, logOut } = useUserStore()
  const [ status, setStatus ] = useState()
  const [ data, setData ] = useState()
  const history = useHistory()

  const axiosInstance = getAxiosInstance({ accessString })

  const handleSendData = data => {
    setStatus(STATUS_PENDING)
    axiosInstance.post(url, data)
      .then(res => {
        if (res.status === 401) {
          logOut()
        }
        else {
          history.goBack()
          setData(res.data)
          setStatus(STATUS_SUCCESS)
        }
        setTimeout(() => {
          setStatus()
        }, 3000)
      })
      .catch(err => {
        logOut()
        console.log(`error in ${url} response`, err)
        setStatus(STATUS_ERROR)
      })
  }


  return {
    handleSendData,
    data,
    status,
    isPending: status === STATUS_PENDING,
    isError: status === STATUS_ERROR,
    isSuccess: status === STATUS_SUCCESS
  }
}
export default useHandleAxios
