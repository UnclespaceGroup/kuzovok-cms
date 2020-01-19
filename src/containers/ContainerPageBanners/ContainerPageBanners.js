import React from 'react'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_PAGE_EDIT, BASE_URL } from 'constants/url'
import _ from 'lodash'
import css from './ContainerPageBanners.module.scss'
import BgImage from 'components/BgImage/BgImage'
import { Link } from 'react-router-dom'
import { MdEdit } from 'react-icons/md'
import { EDIT_PAGE } from 'constants/routes'

const ContainerPageBanners = () => {
  const { data } = useAxiosInstance({ url: METHOD_PAGE_EDIT })
  console.log(data)

  return (
    <div>
      {
        _.map(data, (item, key) => (
          <BgImage className={'mb-24'} key={key} url={BASE_URL + item.banner}>
            <div className={css.banner}>
              <div className={css.title}>{item.title}</div>
              <div className={css.text}>{item.text}</div>
              <Link className={css.edit}
                    to={{ pathname: EDIT_PAGE + item.id, state: {...item}}}
              ><MdEdit /></Link>
            </div>
          </BgImage>
        ))
      }
    </div>
  )
}
export default ContainerPageBanners
