import axios from 'axios'
import { BASE_URL, METHOD_SERVICE } from 'constants/url'

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] ='application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const CURRENT_METHOD = METHOD_SERVICE

export const submitService = async ({data, id, accessString}) => {
  const addr = id ? CURRENT_METHOD + 'add/' + id : CURRENT_METHOD + 'add'
  return await axios.post(addr, data, {
    headers: { Authorization: `JWT ${accessString}` }
  })
    .then(res => {
      console.log(res)
      return 'OK'
    })
}

export const getServices = async () => {
  return await axios.get(CURRENT_METHOD)
    .then(res => {
      return res.data
    })
}

export const deleteServices = async ({id, accessString}) => {
  return await axios.delete(CURRENT_METHOD + id, { data: { id } }, {
    headers: { Authorization: `JWT ${accessString}` }
  })
    .then(res => {
      return 'OK'
    })
}
