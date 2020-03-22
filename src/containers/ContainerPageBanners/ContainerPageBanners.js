import React from 'react'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_CARDS } from 'constants/url'
import _ from 'lodash'
import Banner from 'components/Banner/Banner'

const ContainerPageBanners = () => {
  const { data } = useAxiosInstance({ url: METHOD_CARDS, where: { type: 'page' } })

  return (
    <div>
      {
        _.map(data, (item, key) => (
          <Banner key={key} {...item} />
        ))
      }
    </div>
  )
}
export default ContainerPageBanners
