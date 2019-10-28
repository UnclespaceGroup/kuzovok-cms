import axios from 'axios'
import { BASE_URL, METHOD_ARTICLE, METHOD_WORK } from '../constants/ADDRESS'
import { JWT } from '../constants/OTHER'

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] ='application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const submitWork = async (data, id) => {
  const addr = id ? METHOD_WORK + id : METHOD_WORK
  return await axios.post(addr, data)
    .then(res => {
      console.log(res)
      return 'OK'
    })
}

export const submitArticle = async (data) => {
  return await axios.post(METHOD_ARTICLE, data)
    .then(res => {
      console.log(res)
      return 'OK'
    })
}

export const getWorks = async () => {
  const accessString = localStorage.getItem(JWT)
  console.log(accessString)
  return await axios.get(METHOD_WORK, {
    headers: { Authorization: `JWT ${accessString}` },
  })
    .then(res => {
      return res.data
    })
}

export const deleteWork = async (id) => {
  return await axios.delete(METHOD_WORK + id, { data: { id } })
    .then(res => {
      return 'OK'
    })
}
