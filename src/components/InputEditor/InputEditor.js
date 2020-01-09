import React from 'react'
import ReactSummernote from 'react-summernote'
import 'react-summernote/dist/react-summernote.css'
import 'react-summernote/lang/summernote-ru-RU'
import 'bootstrap/js/src/modal'
import 'bootstrap/js/src/dropdown'
import 'bootstrap/js/src/tooltip'
import Compressor from 'compressorjs'
import _ from 'lodash'

const InputEditor = ({ input = {} }) => {

  const onImageUpload = (fileList) => {
    _.forEach(fileList, item => {
      new Compressor(item, {
        maxWidth: 480,
        success (result) {
          const reader = new FileReader()
          reader.onloadend = () => {
            ReactSummernote.insertImage(reader.result)
          }
          reader.readAsDataURL(result)
        }
      })
    })
  }

  const onChange = function (content) {
    input.onChange(content)
  }
  return (
    <div>
      <ReactSummernote
        value={input.value}
        options={{
          lang: 'ru-RU',
          height: 350,
          toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['para', ['ul', 'ol', 'paragraph']],
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
