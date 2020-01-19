import React from 'react'
import css from './BgImage.module.scss'
import cn from 'classnames'

const BgImage = ({ url, children, className }) => (
  <div className={cn(css.banner, className)} style={{ backgroundImage: `url("${url}")` }}>
    {children}
  </div>
)
export default BgImage
