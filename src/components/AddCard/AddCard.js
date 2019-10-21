import React from 'react'
import css from './AddCard.module.scss'
import { ADD_WORK_PAGE } from '../../constants/ROUTES'
import { Link } from 'react-router-dom'

const AddCard = () => (
  <Link to={ADD_WORK_PAGE} className={css.container}>
    <div className={css.plus}>+</div>
    <div>Добавить</div>
    <div />
  </Link>
)

export default React.memo(AddCard)
