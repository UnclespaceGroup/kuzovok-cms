export const BASE_URL_PROD = 'https://server.mdf-center.ru/'
export const BASE_URL_DEV = 'http://localhost:3002/'
export const BASE_URL = process.env.REACT_APP_DEV === 'true' ? BASE_URL_DEV : BASE_URL_PROD

export const METHOD_WORK = '/work/'
export const METHOD_ARTICLE = '/article/'
export const METHOD_REPORT = '/report/'
export const METHOD_SERVICE = '/service/'