import React, { useRef } from 'react'

import 'jodit/build/jodit.min.css'
import JoditEditor from 'jodit-react'

const InputEditor = ({ input }) => {

  const editor = useRef(null)

  const config = {
    uploader: {
      insertImageAsBase64URI: true
    },
    minHeight: 500,
    language: 'ru',
    toolbarSticky: false,
    disablePlugins: 'hotkeys'
  }

  return (
    <JoditEditor
      ref={editor}
      value={input.value}
      config={config}
      onBlur={newContent => input.onChange(newContent)}
    />
  )
}
export default InputEditor
