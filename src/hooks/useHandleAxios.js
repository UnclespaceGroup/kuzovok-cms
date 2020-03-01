import { useState } from 'react'
import { getAxiosInstance } from 'axiosFetch/index'
import useUserStore from 'hooks/useUserStore'
import { useHistory } from 'react-router'

const STATUS_ERROR = 'STATUS_ERROR'
const STATUS_SUCCESS = 'STATUS_SUCCESS'
const STATUS_PENDING = 'STATUS_PENDING'

const useHandleAxios = ({
  url,
  backUrl,
  onBackClick
}) => {
  const { accessString, logOut } = useUserStore()
  const [ status, setStatus ] = useState()
  const [ data, setData ] = useState()
  const history = useHistory()

  const axiosInstance = getAxiosInstance({ accessString })

  const handleSendData = currentData => {
    setStatus(STATUS_PENDING)
    axiosInstance.post(url, currentData)
      .then(res => {
        if (res.status === 401) {
          logOut()
        }
        else {
          setData(res.data)
          setStatus(STATUS_SUCCESS)
        }
        setTimeout(() => {
          onBackClick && onBackClick()
          backUrl && history.push(backUrl)
          setStatus()
        }, 1000)
      })
      .catch(err => {
        if (err.response.status === 401) {
          logOut()
        }
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
