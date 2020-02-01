import axios from 'axios'
import { BASE_URL } from 'constants/url'

axios.defaults.baseURL = BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const getAxiosInstance = ({ accessString }) => axios.create({
  headers: { Authorization: `JWT ${accessString}` },
  timeout: 6 * 40 * 1000
})

export const axiosInstance = axios.create()
