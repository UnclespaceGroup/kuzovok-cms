import React, { useState } from 'react'
import css from './SectionReport.module.scss'
import Wysiwyg from 'components/Wysiwyg/desktop/Wysiwyg'
import { Collapse } from 'react-collapse'
import { MdKeyboardArrowDown, MdEdit, MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'

const SectionReport = ({ title, text, onDelete, toEditLink }) => {
  const [open, setOpen] = useState(true)

  return (
    <div className={css.block}>
      <div className={css.title} onClick={() => setOpen(!open)}>
        {title}
        <MdKeyboardArrowDown />
      </div>

      <Link to={toEditLink} className={css.edit}><MdEdit /></Link>
      <div className={css.delete} onClick={onDelete}><MdDelete /></div>


      <Collapse isOpened={open}>
        <div className={css.text}>
          <Wysiwyg>{text}</Wysiwyg>
        </div>
      </Collapse>
    </div>
  )
}
export default SectionReport
