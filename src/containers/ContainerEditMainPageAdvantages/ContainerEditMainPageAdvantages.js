import React from 'react'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_ADVANTAGES_MAIN } from 'constants/url'
import _ from 'lodash'
import Card from 'components/Card/Card'
import { ADD_ADVANTAGES_MAIN } from 'constants/routes'
import Link from 'components/Link/Link'
import Padding from 'components/Padding/Padding'

const ContainerEditMainPageAdvantages = () => {
  const { data: cards, handleDeleteData } = useAxiosInstance({ url: METHOD_ADVANTAGES_MAIN })

  return (
    <div>
      <h2>Карточки преимуществ</h2>
      <div className={'row-wrap-3'}>
        {
          _.map(cards, (card, key) => (
            <Card editLink={ADD_ADVANTAGES_MAIN}
                  key={key} {...card}
              onDelete={() => card.id && handleDeleteData(card.id)}
            />
          ))
        }
      </div>
      <Padding value={10} />
      <Link to={ADD_ADVANTAGES_MAIN}>Добавить</Link>
    </div>
  )
}
export default ContainerEditMainPageAdvantages
