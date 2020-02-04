import React from 'react'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_SLIDES } from 'constants/url'
import _ from 'lodash'
import Banner from 'components/Banner/Banner'
import { ADD_SLIDE } from 'constants/routes'
import CardAdd from 'components/CardAdd/Card'
import Padding from 'components/Padding/Padding'

const ContainerEditSlides = () => {
  const { data, handleDeleteData } = useAxiosInstance({ url: METHOD_SLIDES })

  return (
    <div>
      <h2>Список слайдов</h2>
      <CardAdd to={ADD_SLIDE} big />
      <Padding value={40} />
      {
        _.map(data, ({ ...item }, key) => (
          <Banner onDelete={() => handleDeleteData(item.id)}
            withoutId path={ADD_SLIDE} key={key} {...item} />
        ))
      }
    </div>
  )
}
export default ContainerEditSlides
