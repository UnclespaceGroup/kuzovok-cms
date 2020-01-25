export const BASE_URL_PROD = 'http://server.mdf-center.ru/'
export const BASE_URL_DEV = 'http://localhost:3002/'
export const BASE_URL = process.env.REACT_APP_DEV === 'true' ? BASE_URL_DEV : BASE_URL_PROD

export const METHOD_WORK = '/work/'
export const METHOD_PAPER = '/paper/'
export const METHOD_REPORT = '/report/'
export const METHOD_SERVICE = '/service/'
export const METHOD_PAGE_EDIT = '/page/'
export const METHOD_SLIDES = '/slide/'
export const METHOD_ADVANTAGES_MAIN = '/advantages-main/'
export const METHOD_MAIN_PAGE_CARDS = '/main-page-cards/'

export const DELETE_IMAGE_FOLDER_URL = '/delete-image-folder'
