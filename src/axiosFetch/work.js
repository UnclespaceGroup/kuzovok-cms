import axios from 'axios'
import { BASE_URL, METHOD_WORK } from 'constants/url'

axios.defaults.baseURL = BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const submitWork = async ({ data, id, accessString, update }) => {
  const addr = update ? `${METHOD_WORK}update/${id}` : METHOD_WORK + 'add'
  return await axios.post(addr, data,
    {
      headers: { Authorization: `JWT ${accessString}` }
    })
    .then(res => {
      console.log(res)
      return 'OK'
    })
}

export const getWorks = async ({ accessString }) => {
  return await axios.get(METHOD_WORK, { headers: { Authorization: `JWT ${accessString}` } })
    .then(res => {
      return res.data
    })
    .catch(e => {
      console.log(e)
    })
}

export const deleteWork = async ({ id, accessString }) => {
  return await axios.delete(METHOD_WORK + id, { data: { id }, headers: { Authorization: `JWT ${accessString}` } })
    .then(res => {
      return 'OK'
    })
}
