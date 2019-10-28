import axios from 'axios'
import { BASE_URL } from '../constants/ADDRESS'
import { JWT, USER_NAME } from '../constants/OTHER'

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] ='application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const CURRENT_METHOD = 'login'

export const login = async (data) => {
  return await axios.post(CURRENT_METHOD, data)
    .then(res => {
      console.log(res)
      return res.data
    })
    .catch(e => {
      console.log(e)
    })
}
export const logout = () => {
  localStorage.removeItem(JWT)
  localStorage.removeItem(USER_NAME);
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
