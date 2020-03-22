import React from 'react'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_CARDS } from 'constants/url'
import _ from 'lodash'
import Card from 'components/Card/Card'
import { ADD_MAIN_PAGE_CARD } from 'constants/routes'
import Padding from 'components/Padding/Padding'
import CardAdd from 'components/CardAdd/Card'

const ContainerEditMainPageCards = () => {
  const { data: cards, handleDeleteData } = useAxiosInstance({ url: METHOD_CARDS, where: { type: 'mainPageCard' } })

  return (
    <div>
      <h2>Карточки главной</h2>
      <div className={'row-wrap-3'}>
        <CardAdd to={ADD_MAIN_PAGE_CARD} />
        {
          _.map(cards, (card, key) => (
            <Card editLink={ADD_MAIN_PAGE_CARD}
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
export default ContainerEditMainPageCards
