import React from 'react'
import css from './Card.module.scss'
import { BASE_URL } from 'constants/url'
import { Link } from 'react-router-dom'
import { MdEdit, MdDelete } from 'react-icons/md'
import Wysiwyg from 'components/Wysiwyg/desktop/Wysiwyg'
import { FaArrowRight } from 'react-icons/fa'

const Card = ({ editLink, onDelete, to, ...props }) => {
  const {banner, title, text} = props
  const WrapperComponent = to ? Link : 'div'
  return (
  <WrapperComponent className={css.container} to={to}>
    <div className={css.img} style={{ backgroundImage: `url(${BASE_URL + banner})` }} />
    <div className={css.title}>{title}</div>
    <Wysiwyg className={css.text}>{text}</Wysiwyg>
    { editLink && <Link className={css.edit}
      to={{ pathname: editLink, state: {...props}}}
    ><MdEdit /></Link>}
    {onDelete && <div className={css.delete} onClick={() => onDelete()}
    ><MdDelete /></div>}
    {
      to && <div className={css.link} ><FaArrowRight /></div>
    }
  </WrapperComponent>
)}
export default Card
