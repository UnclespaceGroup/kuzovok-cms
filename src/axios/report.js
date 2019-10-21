import axios from 'axios'
import { BASE_URL, METHOD_REPORT } from '../constants/ADDRESS'

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] ='application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const CURRENT_METHOD = METHOD_REPORT

export const submitReport = async (data, id) => {
  const addr = id ? CURRENT_METHOD + id : CURRENT_METHOD
  return await axios.post(addr, data)
    .then(res => {
      console.log(res)
      return 'OK'
    })
}

export const getReports = async ({ parentId }) => {
  return await axios.get(CURRENT_METHOD.slice(0, -1) + `?parentId=${parentId}`)
    .then(res => {
      return res.data
    })
}

export const deleteReport = async (id) => {
  return await axios.delete(CURRENT_METHOD + id, { data: { id } })
    .then(res => {
      return 'OK'
    })
}
