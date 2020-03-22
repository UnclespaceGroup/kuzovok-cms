import React from 'react'
import css from './Banner.module.scss'
import { Link } from 'react-router-dom'
import { EDIT_PAGE } from 'constants/routes'
import BgImage from 'components/BgImage/BgImage'
import { MdEdit, MdDelete } from 'react-icons/md'
import { getImageUrl } from 'services/getImageUrl'

const Banner = ({ withoutId, onDelete, ...props }) => {
  const editPath = props.path || EDIT_PAGE
  const id = (!withoutId && props.id) ? props.id : ''
  return (
  <BgImage className={'mb-24'} url={getImageUrl(props.banner)}>
    <div className={css.banner}>
      <div className={css.title}>{props.title}</div>
      <div className={css.text}>{props.text}</div>
      {onDelete && <div className={css.delete} onClick={() => onDelete()}
      ><MdDelete /></div>}
      <Link className={css.edit}
            to={{ pathname: editPath + id, state: {...props}}}
      ><MdEdit /></Link>
    </div>
  </BgImage>
)}
export default Banner
