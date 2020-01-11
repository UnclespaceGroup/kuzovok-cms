import axios from 'axios'
import { BASE_URL } from '../constants/ADDRESS'

axios.defaults.baseURL = BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const axiosApi = ({ accessString }) => axios.create({
  headers: { Authorization: `JWT ${accessString}` }
})
