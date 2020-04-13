import { NEW_ITEM } from 'constants/routes'

export const getLoadDataByIdUrl = (method, id) => {
  if (id === NEW_ITEM) {
    return undefined
  } else {
    return method
  }
}