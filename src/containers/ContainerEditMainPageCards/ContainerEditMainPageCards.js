import React from 'react'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_MAIN_PAGE_CARDS } from 'constants/url'
import _ from 'lodash'
import Card from 'components/Card/Card'
import { ADD_MAIN_PAGE_CARD } from 'constants/routes'
import Link from 'components/Link/Link'
import Padding from 'components/Padding/Padding'

const ContainerEditMainPageCards = () => {
  const { data: cards, handleDeleteData } = useAxiosInstance({ url: METHOD_MAIN_PAGE_CARDS })

  return (
    <div>
      <h2>Карточки главной</h2>
      <div className={'row-wrap-3'}>
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
      <Link to={ADD_MAIN_PAGE_CARD}>Добавить</Link>
    </div>
  )
}
export default ContainerEditMainPageCards
