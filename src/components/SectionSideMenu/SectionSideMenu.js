import React from 'react'
import css from './SectionSideMenu.module.scss'
import _ from 'lodash'
import { Link } from 'react-router-dom'

const SectionSideMenu = ({ blocks }) => (
  <div className={css.container}>
    {
      _.map(blocks, (block, blockKey) => (
        <div key={blockKey} className={css.block}>
          <Link to={block.to || '#'} className={css.title}>{block.title}</Link>
          {
            _.map(block.items, (item, key) => (
              <Link className={css.item} to={item.to || '#'} key={key}>
                {item.title}
              </Link>
            ))
          }
        </div>
      ))
    }
  </div>
)
export default SectionSideMenu
