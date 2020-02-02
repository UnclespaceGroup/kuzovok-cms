import React from 'react'
import cn from 'classnames'
import css from './Card.module.scss'
import { Link } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'

const CardAdd = ({ to, big, text }) => {
  const WrapperComponent = to ? Link : 'div'
  return (
    <WrapperComponent to={to} className={cn(css.container, {[css.big]: big})}>
      <MdAdd className={css.icon} />
      <div className={css.title}>{text || 'Добавить'}</div>
    </WrapperComponent>
  )
}
export default CardAdd
