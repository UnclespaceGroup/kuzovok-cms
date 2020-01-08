import React, { useState, useEffect } from 'react'
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-ru-RU';
import 'bootstrap/js/src/modal';
import 'bootstrap/js/src/dropdown';
import 'bootstrap/js/src/tooltip';
import Compressor from 'compressorjs';

const InputEditor = ({ input, ...props }) => {
  const [_content, setContent] = useState()

  useEffect(() => {
    let text = ''
    let newText = props.text
    if (newText.blocks) {
      newText.blocks.map((res) => {
        text += res.text
      })
    } else text = props.text
    console.log(props)
    setContent(text)
  }, [])

  const onImageUpload = (fileList) => {
    new Compressor(fileList[0], {
      maxWidth: 480,
      success(result) {
        const reader = new FileReader();
        reader.onloadend = () => {
          ReactSummernote.insertImage(reader.result);
        }

        reader.readAsDataURL(result);

      }
    })
  }

  const onChange = function (content) {
    setContent(content)
    props.onEditText(content, content)
  }
  return (
    <div>
      <ReactSummernote
        value={_content}
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
