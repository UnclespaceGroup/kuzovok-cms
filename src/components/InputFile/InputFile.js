import React, { useRef, useState } from 'react'
import css from './InputFile.module.scss'
import { BASE_URL } from 'constants/url'
import cn from 'classnames'
import loader from 'static/loader.svg'
import { MdEdit } from 'react-icons/md'
import useUserStore from 'hooks/useUserStore'
import { sendFile } from 'services/sendFile'

const InputFile = ({ input, isSingleImage, id, categoryName, typeName }) => {
  const { accessString } = useUserStore()
  const [pending, setPending] = useState()
  const inputRef = useRef(null)

  const send = () => {
    setPending(true)
    const files = inputRef.current && inputRef.current.files
    sendFile({
      id, categoryName, typeName, accessString, isSingleImage, name: input.name, file: files[0]
    }).then(data => {
      setPending(false)
      input.onChange(data.filePath)
    }).catch(err => {
      setPending(false)
      console.log(err)
    })
  }

  const imgPath = input.value && `${BASE_URL}${input.value}`

  if (pending) {
    return (
      <div className={css.loader}>
        <img src={loader} alt={'loader'} />
        <div>Загрузка</div>
      </div>
    )
  }

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
