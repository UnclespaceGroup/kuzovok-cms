import React from 'react'
import css from './Banner.module.scss'
import { BASE_URL } from 'constants/url'
import { Link } from 'react-router-dom'
import { EDIT_PAGE } from 'constants/routes'
import BgImage from 'components/BgImage/BgImage'
import { MdEdit } from 'react-icons/md'

const Banner = (props) => {
  const editPath = props.path || EDIT_PAGE
  const id = props.id || ''
  return (
  <BgImage className={'mb-24'} url={BASE_URL + props.banner}>
    <div className={css.banner}>
      <div className={css.title}>{props.title}</div>
      <div className={css.text}>{props.text}</div>
      <Link className={css.edit}
            to={{ pathname: editPath + id, state: {...props}}}
      ><MdEdit /></Link>
    </div>
  </BgImage>
)}
export default Banner
