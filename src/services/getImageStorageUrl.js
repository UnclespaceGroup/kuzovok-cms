import { BASE_URL } from 'constants/url'

export const getImageStorageUrl = (img) => {
  return `${BASE_URL}${img}`
}
