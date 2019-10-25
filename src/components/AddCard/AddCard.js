import React from 'react'
import css from './AddCard.module.scss'
import { Link } from 'react-router-dom'

const AddCard = ({ path }) => (
  <Link to={path} className={css.container}>
    <div className={css.plus}>+</div>
    <div>Добавить</div>
    <div />
  </Link>
)

export default React.memo(AddCard)
