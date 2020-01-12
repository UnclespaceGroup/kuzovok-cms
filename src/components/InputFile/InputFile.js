import React, { useRef } from 'react'
import { axiosApi } from 'axiosFetch'
import css from './InputFile.module.scss'
import { BASE_URL } from 'constants/url'
import cn from 'classnames'
import { MdEdit } from 'react-icons/md'

const InputFile = ({ input, accessString, isSingleImage, id, categoryName, typeName }) => {
  if (!id || !categoryName || !typeName) {
    console.error('where is fucking PARAMS')
  }
  const inputRef = useRef(null)
  const send = () => {
    if (!id || !categoryName || !typeName) return
    const axiosInstanse = axiosApi({ accessString })

    var bodyFormData = new FormData()
    const files = inputRef.current && inputRef.current.files

    bodyFormData.append('categoryName', categoryName)
    bodyFormData.append('id', id)
    bodyFormData.append('typeName', input.name)

    isSingleImage && bodyFormData.append('clearOld', 'true')

    bodyFormData.append('filedata', files[0])
    axiosInstanse({
      headers: { 'Content-Type': 'multipart/form-data' },
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
  return imgPath ?
    <div className={css.container}>
      <div className={css.img} style={{ backgroundImage: `url("${imgPath}")` }} />
      <label className={css.btnChange}>
        <MdEdit />
        <input
          ref={inputRef}
          type={'file'}
          onChange={() => {
            send()
          }}
        />
      </label>
    </div>
    : <label className={cn(css.container, css.empty)}>
        <div>
          Добавить фото
        </div>
      <input
        ref={inputRef}
        type={'file'}
        onChange={() => {
          send()
        }}
      />
    </label>

}
export default React.memo(InputFile)
