import React from 'react'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_CARDS } from 'constants/url'
import _ from 'lodash'
import Banner from 'components/Banner/Banner'
import Padding from 'components/Padding/Padding'

const PAGE_NAMES = {
  'page-about': 'Страница о нас',
  'page-articles': 'Полезные статьи',
  'page-last': 'Лента',
  'page-works': 'Работы станции'
}

const ContainerPageBanners = () => {
  const { data } = useAxiosInstance({ url: METHOD_CARDS, where: { type: 'page' } })
  return (
    <div>
      {
        _.map(data, (item, key) => console.log(item.id) || (
          <div key={key}>
            <h2 >{PAGE_NAMES[item.id]}</h2>
            <Banner key={key} {...item} />
            <Padding value={60} />
          </div>
        ))
      }
    </div>
  )
}
export default ContainerPageBanners
