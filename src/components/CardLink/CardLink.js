import React from 'react'
import cn from 'classnames'
import css from './CardLink.module.scss'
import { Link } from 'react-router-dom'

const CardLink = ({ children, to, theme }) => {
  return (
    <Link to={to || '#'} className={cn(css.container, css[theme])} >{children}</Link>
  )
}
export default CardLink
