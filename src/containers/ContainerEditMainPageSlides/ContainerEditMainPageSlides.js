import React from 'react'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_SLIDES } from 'constants/url'
import _ from 'lodash'
import Card from 'components/Card/Card'
import { ADD_SLIDE, NEW_ITEM } from 'constants/routes'
import Padding from 'components/Padding/Padding'
import CardAdd from 'components/CardAdd/Card'

const ContainerEditMainPageSlides = () => {
  const { data: cards, handleDeleteData } = useAxiosInstance({ url: METHOD_SLIDES })

  return (
    <div>
      <h2>Слайды на главной</h2>
      <div className={'row-wrap-3'}>
        <CardAdd to={ADD_SLIDE + NEW_ITEM} />
        {
          _.map(cards, (card, key) => (
            <Card editLink={ADD_SLIDE + card.id}
                  key={key} {...card}
              onDelete={() => card.id && handleDeleteData(card.id)}
            />
          ))
        }
      </div>
      <Padding value={10} />
    </div>
  )
}
export default ContainerEditMainPageSlides
