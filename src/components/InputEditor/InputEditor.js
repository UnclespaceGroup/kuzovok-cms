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
import { BASE_URL } from 'constants/url'
import _ from 'lodash'

const InputEditor = ({ input = {}, id, categoryName, typeName }) => {
  let editorRef = useRef(null)
  const { accessString, logOut } = useUserStore()

  const onImageUpload = (fileList) => {
    _.forEach(fileList, file => {
      sendFile({file, id, categoryName, typeName, accessString, name: input.name})
        .then(res => {
          if (editorRef.current) {
            editorRef.current.insertImage(BASE_URL + res.filePath, res.filePath)
          }
        })
        .catch(e => {
          if (e.response.status === 401) logOut()
          console.log(e)
        })
    })
  }

  const pathTemplate = '__path__'

  const onChange = function (content) {
    const _value = content.replace(new RegExp(BASE_URL, 'g'), pathTemplate)
    input.onChange(_value)
  }
  const formattedValue = input.value.replace(new RegExp(pathTemplate, 'g'), BASE_URL)

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
