import { getAxiosInstance } from 'axiosFetch'

export const sendFile = async ({ id, categoryName, typeName, accessString, file, isSingleImage, name }) => {

  if (!id || !categoryName || !typeName) {
    console.log('params?????')
    return
  }
  try {
    const axiosInstanse = getAxiosInstance({ accessString })

    let bodyFormData = new FormData()

    bodyFormData.append('categoryName', categoryName)
    bodyFormData.append('id', id)
    bodyFormData.append('typeName', name)

    isSingleImage && bodyFormData.append('clearOld', 'true')

    bodyFormData.append('filedata', file)
    const { data } = await axiosInstanse({
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `JWT ${accessString}`
      },
      method: 'post',
      url: '/upload',
      data: bodyFormData
    })
    return data
  } catch (e) {
    console.log(e)
  }
}
