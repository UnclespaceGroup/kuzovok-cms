import React from 'react'
import css from './WysiwygMobile.module.scss'
import useWysiwyg from 'components/Wysiwyg/useWysiwyg'

const WysiwygMobile = ({ children, width }) => {
  const { text } = useWysiwyg({ children })
  return (
    <div className={css.container} style={{ width }} dangerouslySetInnerHTML={{ __html: text }} />
  )
}

export default React.memo(WysiwygMobile)
