import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { getAxiosInstance } from 'axiosFetch/index'
import useUserStore from 'hooks/useUserStore'

const STATUS_ERROR = 'STATUS_ERROR'
const STATUS_SUCCESS = 'STATUS_SUCCESS'
const STATUS_PENDING = 'STATUS_PENDING'

const useAxiosInstance = ({
  url,
  where,
  single,
  limit,
  rangeData
}, deps) => {
  const { accessString, logOut } = useUserStore()
  const [ status, setStatus ] = useState()
  const [ data, setData ] = useState()
  const location = useLocation()

  const axiosInstance = getAxiosInstance({ accessString })

  useEffect(() => {
    setStatus(STATUS_PENDING)
    axiosInstance.post(url, { where, single, limit, rangeData })
      .then(res => {
        if (res.status === 401) {
          logOut()
        }
        setData(res.data)
        setStatus(STATUS_SUCCESS)
      })
      .catch(err => {
        logOut()
        console.log(`error in ${url} response`, err)
        setStatus(STATUS_ERROR)
      })
  }, [location].concat(deps))


  return {
    data,
    status,
    isPending: status === STATUS_PENDING,
    isError: status === STATUS_ERROR,
    isSuccess: status === STATUS_SUCCESS
  }
}
export default useAxiosInstance
