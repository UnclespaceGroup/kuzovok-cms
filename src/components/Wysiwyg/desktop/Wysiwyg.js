import React from 'react'
import cn from 'classnames'
import css from './Wysiwyg.module.scss'
import { BASE_URL } from 'constants/url'
const pathTemplate = '__path__'

const Wysiwyg = ({ children, width, className }) => {
  const text = typeof children === 'string' && children.replace(new RegExp(pathTemplate, 'g'), BASE_URL)
  return (
    <div className={cn(css.container, className)} style={{ width }} dangerouslySetInnerHTML={{ __html: text }} />
  )
}

export default React.memo(Wysiwyg)
