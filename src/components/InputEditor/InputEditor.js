import React, { useRef, useState } from 'react'
import ReactSummernote from 'react-summernote'
import cn from 'classnames'
import 'react-summernote/dist/react-summernote.css'
import 'react-summernote/lang/summernote-ru-RU'
import 'bootstrap/js/src/modal'
import 'bootstrap/js/src/dropdown'
import 'bootstrap/js/src/tooltip'
import css from './InputEditor.module.scss'
import { sendFile } from 'services/sendFile'
import useUserStore from 'hooks/useUserStore'
import { BASE_URL, SERVER_HASH } from 'constants/url'
import _ from 'lodash'
import loader from 'static/loader.svg'
import { getImageUrl } from 'services/getImageUrl'

const InputEditor = ({ input = {}, fileFolder = 'test', typeName = 'test', id = 'test', size }) => {
  let editorRef = useRef(null)
  const [ pending, setPending ] = useState()

  const { accessString, logOut } = useUserStore()

  const onImageUpload = (fileList) => {
    setPending(true)
    _.forEach(fileList, file => {
      sendFile({
        file,
        accessString,
        filePath: [fileFolder, id, typeName].join('/')
      })
        .then(res => {
          setPending(false)
          if (editorRef.current) {
            editorRef.current.insertImage(getImageUrl(res.filePath), res.filePath)
          }
        })
        .catch(e => {
          setPending(false)
          if (e.response && e.response.status === 401) logOut()
          console.log(e)
        })
    })
  }

  const onChange = function (content) {
    const _value = content.replace(new RegExp(BASE_URL, 'g'), SERVER_HASH)
    input.onChange(_value)
  }

  const formattedValue = input.value.replace(new RegExp(SERVER_HASH, 'g'), BASE_URL)

  return (
    <div className={cn(css.container, {[css.pending]: pending})}>
      {
        pending && <div className={css.loader}>
          <img src={loader} alt={'loader'} />
          <div>Загрузка</div>
        </div>
      }
      <ReactSummernote
        ref={editorRef}
        value={formattedValue}
        options={{
          lang: 'ru-RU',
          height: size || 800,
          toolbar: [
            ['style', ['style']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['table', ['table']],
            ['insert', ['link', 'picture']],
            ['para', ['ul', 'ol', 'paragraph', 'h1', 'h2']],
            ['height', ['height']],
          ]
        }}
        onImageUpload={onImageUpload}
        onChange={onChange}
        onMediaDelete={res => {
          console.log(res)
        }}
      />
    </div>
  )
}
export default React.memo(InputEditor)
