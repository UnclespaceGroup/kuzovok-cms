import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import css from 'components/Link/Link.module.scss'

const Link = ({ to, children }) => (
  <RouterLink className={css.link} to={to}>
    {children}
  </RouterLink>
)
export default Link
