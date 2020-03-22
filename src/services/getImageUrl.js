import { BASE_URL, SERVER_HASH } from 'constants/url'

export const getImageUrl = (file) => {
  return (typeof file === 'string') && file.replace(SERVER_HASH, BASE_URL)
}