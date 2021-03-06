import React from 'react'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_CARDS } from 'constants/url'
import _ from 'lodash'
import Card from 'components/Card/Card'
import { ADD_ADVANTAGES_MAIN, NEW_ITEM } from 'constants/routes'
import Padding from 'components/Padding/Padding'
import CardAdd from 'components/CardAdd/Card'

const ContainerEditMainPageAdvantages = () => {
  const { data: cards, handleDeleteData } = useAxiosInstance({ url: METHOD_CARDS, where: { type: 'advantagesCard' } })

  return (
    <div>
      <h2>Карточки преимуществ</h2>
      <div className={'row-wrap-3'}>
        <CardAdd to={ADD_ADVANTAGES_MAIN + NEW_ITEM} />
        {
          _.map(cards, (card, key) => (
            <Card editLink={ADD_ADVANTAGES_MAIN + card.id}
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
export default ContainerEditMainPageAdvantages
