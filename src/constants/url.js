export const BASE_URL_PROD = 'http://cms.kuzovok11.ru/'
export const BASE_URL_DEV = 'http://localhost:3002/'
export const BASE_URL = process.env.REACT_APP_DEV === 'true' ? BASE_URL_DEV : BASE_URL_PROD

export const METHOD_WORK = '/work/'
export const METHOD_OTHER_DATA = '/data/'
export const METHOD_PAPER = '/paper/'
export const METHOD_REPORT = '/report/'
export const METHOD_SERVICE = '/service/'
export const METHOD_PAGE_EDIT = '/page/'
export const METHOD_SLIDES = '/slide/'
export const METHOD_CONTACTS = '/contact/'

export const METHOD_CARDS = '/cards/'
// export const DELETE_IMAGE_FOLDER_URL = '/delete-image-folder'

export const SERVER_HASH = '__SERVER_PATH__'
