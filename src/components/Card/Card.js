import React from 'react'
import css from './Card.module.scss'
import { Link } from 'react-router-dom'
import { MdEdit, MdDelete } from 'react-icons/md'
import { FaArrowRight } from 'react-icons/fa'
import { getImageUrl } from 'services/getImageUrl'

const Card = ({ editLink, onDelete, to, ...props }) => {
  const { banner, title, annotation } = props
  const WrapperComponent = to ? Link : 'div'
  return (
    <div className={css.container}>
      <WrapperComponent  to={to}>
        <div className={css.img} style={{ backgroundImage: `url(${getImageUrl(banner)})` }} />
        <div className={css.title}>{title}</div>
        <div className={css.text}>{annotation}</div>

      </WrapperComponent>

      {editLink && <Link className={css.edit}
                         to={{ pathname: editLink, state: { ...props } }}
      ><MdEdit /></Link>}
      {onDelete && <div className={css.delete} onClick={() => onDelete()}
      ><MdDelete /></div>}
      {
        to && <div className={css.link}><FaArrowRight /></div>
      }
    </div>
  )
}
export default Card
