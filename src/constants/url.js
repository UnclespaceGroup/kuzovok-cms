export const BASE_URL_PROD = 'http://server.mdf-center.ru/'
export const BASE_URL_DEV = 'http://localhost:3002/'
export const BASE_URL = process.env.REACT_APP_DEV === 'true' ? BASE_URL_DEV : BASE_URL_PROD

export const METHOD_WORK = '/work/'
export const METHOD_PAPER = '/paper/'
export const METHOD_REPORT = '/report/'
export const METHOD_SERVICE = '/service/'
export const METHOD_PAGE_EDIT = '/page/'

export const DELETE_IMAGE_FOLDER_URL = '/delete-image-folder'
