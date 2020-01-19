import React from 'react'
import PropTypes from 'prop-types'
import css from './WysiwygMobile.module.scss'

const WysiwygMobile = ({ children, width }) => (
  <div className={css.container} style={{ width }} dangerouslySetInnerHTML={{ __html: children }} />
)
WysiwygMobile.propTypes = {
  children: PropTypes.node,
  width: PropTypes.string
}

export default React.memo(WysiwygMobile)
