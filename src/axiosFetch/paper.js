import axios from 'axios'
import { BASE_URL, METHOD_PAPER } from '../constants/ADDRESS'

axios.defaults.baseURL = BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const submitPaper = async ({ data, id, accessString }) => {
  const addr = id ? `${METHOD_PAPER}update/${id}` : METHOD_PAPER + 'add'
  return await axios.post(addr, data,
    {
      headers: { Authorization: `JWT ${accessString}` }
    })
    .then(res => {
      console.log(res)
      return 'OK'
    })
}

export const getPapers = async ({ accessString }) => {
  return await axios.get(METHOD_PAPER, { headers: { Authorization: `JWT ${accessString}` } })
    .then(res => {
      return res.data
    })
    .catch(e => {
      console.log(e)
    })
}

export const deletePaper = async ({ id, accessString }) => {
  return await axios.delete(METHOD_PAPER + id, { data: { id }, headers: { Authorization: `JWT ${accessString}` } })
    .then(res => {
      return 'OK'
    })
}
