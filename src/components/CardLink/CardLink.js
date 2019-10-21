import React from 'react'
import css from './CardLink.module.scss'
import { Link } from 'react-router-dom'

const CardLink = ({ children, to }) => {
  return (
    <Link to={to} className={css.container} >{children}</Link>
  )
}
export default CardLink