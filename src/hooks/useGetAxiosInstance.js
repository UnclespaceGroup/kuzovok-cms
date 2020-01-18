import { useState } from 'react'
import { getAxiosInstance } from 'axiosFetch/index'
import useUserStore from 'hooks/useUserStore'

const STATUS_ERROR = 'STATUS_ERROR'
const STATUS_SUCCESS = 'STATUS_SUCCESS'
const STATUS_PENDING = 'STATUS_PENDING'

const useGetAxiosInstance = ({
  url,
}) => {
  const { accessString, logOut } = useUserStore()
  const [ status, setStatus ] = useState()
  const [ data, setData ] = useState()

  const axiosInstance = getAxiosInstance({ accessString })


  const handleSendData = data => {
    axiosInstance.post(url, data)
      .then(res => {
        if (res.status === 403) {
          logOut()
        }
        setData(res.data)
        setStatus(STATUS_SUCCESS)

        setTimeout(() => {
          setStatus()
        }, 3000)
      })
      .catch(err => {
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
export default useGetAxiosInstance
