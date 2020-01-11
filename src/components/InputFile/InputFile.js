import React from 'react'
import { axiosApi } from 'axiosFetch'

const InputFile = ({ input, accessString }) => {
  const send = () => {
    const axiosInstanse = axiosApi({accessString })

    var bodyFormData = new FormData();
    bodyFormData.append('file', input.value);
    axiosInstanse({
      enctype: 'multipart/form-data',
      method: 'post',
      url: '/upload',
      data: bodyFormData
    })
  }

  return (
    <div>
      <input
        {...input}
        type={'file'}
      />
      <button type={'button'} onClick={() => send()}>Отправить</button>
    </div>
  )
}
export default React.memo(InputFile)
