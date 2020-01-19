import React from 'react'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_PAGE_EDIT } from 'constants/url'
import _ from 'lodash'
import Banner from 'components/Banner/Banner'

const ContainerPageBanners = () => {
  const { data } = useAxiosInstance({ url: METHOD_PAGE_EDIT })

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
