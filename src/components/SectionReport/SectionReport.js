import React, { useState } from 'react'
import css from './SectionReport.module.scss'
import Wysiwyg from 'components/Wysiwyg/desktop/Wysiwyg'
import { Collapse } from 'react-collapse'
import { MdArrowDropDown, MdEdit, MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'

const SectionReport = ({ title, text, onDelete, toEditLink }) => {
  const [open, setOpen] = useState()

  return (
    <div className={css.block}>
      <div className={css.title}>{title}</div>

      <Link to={toEditLink} className={css.edit}><MdEdit /></Link>
      <div className={css.delete} onClick={onDelete}><MdDelete /></div>

      <div className={css.openBtn} onClick={() => setOpen(!open)}>
        {open ? 'Скрыть' : 'Открыть'}<MdArrowDropDown />
      </div>
      <Collapse isOpened={open}>
        <div className={css.text}>
          <Wysiwyg>{text}</Wysiwyg>
        </div>
      </Collapse>
    </div>
  )
}
export default SectionReport
