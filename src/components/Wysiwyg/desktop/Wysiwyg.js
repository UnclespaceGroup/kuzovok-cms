import React from 'react'
import PropTypes from 'prop-types'
import css from './Wysiwyg.module.scss'

const Wysiwyg = ({ children, width }) => (
  <div className={css.container} style={{ width }} dangerouslySetInnerHTML={{ __html: children }} />
)
Wysiwyg.propTypes = {
  children: PropTypes.node,
  width: PropTypes.string
}

export default React.memo(Wysiwyg)
