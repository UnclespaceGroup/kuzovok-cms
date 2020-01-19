import React from 'react'
import cn from 'classnames'
import css from './Wysiwyg.module.scss'

const Wysiwyg = ({ children, width, className }) => (
  <div className={cn(css.container, className)} style={{ width }} dangerouslySetInnerHTML={{ __html: children }} />
)

export default React.memo(Wysiwyg)
