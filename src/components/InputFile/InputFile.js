import React, { useRef } from 'react'
import { axiosApi } from 'axiosFetch'
import css from './InputFile.module.scss'
import { BASE_URL } from 'constants/ADDRESS'

const InputFile = ({ input, accessString }) => {
  const inputRef = useRef(null)
  const send = () => {
    const axiosInstanse = axiosApi({accessString })

    var bodyFormData = new FormData()
    const files = inputRef.current && inputRef.current.files

    bodyFormData.append('folder', 'defaultName')
    bodyFormData.append('clearOld', 'true')
    bodyFormData.append('filedata', files[0])
    axiosInstanse({
      headers: {'Content-Type': 'multipart/form-data' },
      method: 'post',
      url: '/upload',
      data: bodyFormData
    }).then(res => {
      console.log(res)
      if (res.status === 200) {
        input.onChange(res.data.filePath)
      }
    }).catch(e => console.log(e))
  }
  const imgPath = input.value && `${BASE_URL}${input.value}`
  return (
    <label className={css.container}>
      {imgPath ?
        <div className={css.img} style={{ backgroundImage: `url("${imgPath}")` }} />
        : <div>
          Добавить фото
      </div>
      }
      <input
        ref={inputRef}
        type={'file'}
        onChange={() => {
          send()
        }}
      />
    </label>
  )
}
export default React.memo(InputFile)
