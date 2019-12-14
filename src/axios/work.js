import axios from 'axios'
import { BASE_URL, METHOD_WORK } from '../constants/ADDRESS'
import { JWT } from '../constants/OTHER'

axios.defaults.baseURL = BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const submitWork = async (data, id) => {
  const addr = id ? `${METHOD_WORK}update/${id}` : METHOD_WORK + 'add'
  const accessString = localStorage.getItem(JWT)
  return await axios.post(addr, data,
    {
      headers: { Authorization: `JWT ${accessString}` }
    })
    .then(res => {
      console.log(res)
      return 'OK'
    })
}

export const getWorks = async () => {
  const accessString = localStorage.getItem(JWT)
  return await axios.get(METHOD_WORK, { headers: { Authorization: `JWT ${accessString}` } })
    .then(res => {
      console.log(res)
      return res.data
    })
    .catch(e => {
      console.log(e)
    })
}

export const deleteWork = async (id) => {
  const accessString = localStorage.getItem(JWT)
  return await axios.delete(METHOD_WORK + id, { data: { id } }, {
    headers: { Authorization: `JWT ${accessString}` }
  })
    .then(res => {
      return 'OK'
    })
}
