import React from 'react'
import css from './AddCard.module.scss'
import { Link } from 'react-router-dom'

const AddCard = ({ to, text }) => (
  <Link to={to} className={css.container}>
    <div className={css.plus}>+</div>
    <div>{text || 'Добавить'}</div>
    <div />
  </Link>
)

export default React.memo(AddCard)
