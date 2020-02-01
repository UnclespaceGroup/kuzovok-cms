import React, { useRef } from 'react'
import ReactSummernote from 'react-summernote'
import 'react-summernote/dist/react-summernote.css'
import 'react-summernote/lang/summernote-ru-RU'
import 'bootstrap/js/src/modal'
import 'bootstrap/js/src/dropdown'
import 'bootstrap/js/src/tooltip'
import css from './InputEditor.module.scss'
import { sendFile } from 'services/sendFile'
import useUserStore from 'hooks/useUserStore'
import { BASE_URL_DEV } from 'constants/url'
import _ from 'lodash'

const InputEditor = ({ input = {}, id, categoryName, typeName }) => {
  let editorRef = useRef(null)
  const { accessString } = useUserStore()

  const onImageUpload = (fileList) => {
    _.forEach(fileList, file => {
      sendFile({file, id, categoryName, typeName, accessString, name: input.name})
        .then(res => {
          console.log(res)
          if (editorRef.current) {
            editorRef.current.insertImage(BASE_URL_DEV + res.filePath, res.filePath)
          }
        })
        .catch(e => {
          console.log(e)
        })
    })
  }

  const pathTemplate = '__path__'

  const onChange = function (content) {
    const _value = content.replace(new RegExp(BASE_URL_DEV, 'g'), pathTemplate)
    input.onChange(_value)
  }
  const formattedValue = input.value.replace(new RegExp(pathTemplate, 'g'), BASE_URL_DEV)

  return (
    <div className={css.container}>
      <ReactSummernote
        ref={editorRef}
        value={formattedValue}
        options={{
          lang: 'ru-RU',
          height: 800,
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
      />
    </div>
  )
}
export default React.memo(InputEditor)
