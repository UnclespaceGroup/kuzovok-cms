import { getAxiosInstance } from 'axiosFetch'

export const sendFile = async ({ filePath, accessString, file }) => {

  if (!filePath) {
    console.log('params?????')
    return
  }
  try {
    const axiosInstanse = getAxiosInstance({ accessString })

    let bodyFormData = new FormData()

    bodyFormData.append('path', filePath)

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
