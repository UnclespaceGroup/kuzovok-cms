import axios from 'axios'
import { BASE_URL, METHOD_REPORT } from 'constants/url'

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] ='application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const CURRENT_METHOD = METHOD_REPORT

export const submitReport = async ({ data, id , accessString}) => {
  const addr = id ? `${CURRENT_METHOD}update/${id}`: `${CURRENT_METHOD}add`
  return await axios.post(addr, data, {
    headers: { Authorization: `JWT ${accessString}` }
  })
    .then(res => {
      console.log(res)
      return 'OK'
    })
}

export const getReports = async ({ parentId }) => {
  return await axios.post(CURRENT_METHOD, { where: {parentId} })
    .then(res => {
      return res.data
    })
}

export const deleteReport = async ({ id, accessString }) => {
  return await axios.delete(CURRENT_METHOD + id, { data: { id } }, {
    headers: { Authorization: `JWT ${accessString}` }
  })
    .then(res => {
      return { res }
    })
}
