import React, { useRef, useState, useMemo } from 'react'

import 'jodit/build/jodit.min.css'
import JoditEditor from 'jodit-react'

const InputEditor = ({ input }) => {
  const [ val, setVal ] = useState()
  const editor = useRef(null)

  useMemo(() => {
    setVal(input.value)
  }, [input.value])

  // const config = {
  //   uploader: {
  //     insertImageAsBase64URI: true
  //   },
  //   minHeight: 500,
  //   language: 'ru',
  //   readonly: false,
  //   toolbarSticky: false,
  //   disablePlugins: 'hotkeys'
  // }

  return (
    <div onBlur={() => {input.onChange(editor.current.state.value)}}>
      <JoditEditor
        value={val}
        ref={editor}
      />
    </div>
  )
}
export default React.memo(InputEditor)
