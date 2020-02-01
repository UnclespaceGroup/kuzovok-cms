import React from 'react'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_SLIDES } from 'constants/url'
import _ from 'lodash'
import Banner from 'components/Banner/Banner'
import { ADD_SLIDE } from 'constants/routes'
import Link from 'components/Link/Link'

const ContainerEditSlides = () => {
  const { data } = useAxiosInstance({ url: METHOD_SLIDES })

  return (
    <div>
      <h2>Список слайдов</h2>
      {
        _.map(data, (item, key) => (
          <Banner path={ADD_SLIDE} key={key} {...item} />
        ))
      }
      <Link to={ADD_SLIDE}>Добавить слайд</Link>
    </div>
  )
}
export default ContainerEditSlides
