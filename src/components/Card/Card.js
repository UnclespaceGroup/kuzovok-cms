import React from 'react'
import css from './Card.module.scss'
import { BASE_URL } from 'constants/url'
import { Link } from 'react-router-dom'
import { MdEdit, MdDelete } from 'react-icons/md'

const Card = ({ editLink, onDelete, ...props }) => {
  const {banner, title, text} = props
  return (
  <div className={css.container} >
    <div className={css.img} style={{ backgroundImage: `url(${BASE_URL + banner})` }} />
    <div className={css.title}>{title}</div>
    <div className={css.text}>{text}</div>
    { editLink && <Link className={css.edit}
      to={{ pathname: editLink, state: {...props}}}
    ><MdEdit /></Link>}
    <div className={css.delete} onClick={() => onDelete()}
    ><MdDelete /></div>
  </div>
)}
export default Card
