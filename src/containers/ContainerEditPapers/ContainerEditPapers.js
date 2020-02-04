import React from 'react'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_PAPER } from 'constants/url'
import Card from 'components/Card/Card'
import _ from 'lodash'
import { ADD_PAPER_PAGE } from 'constants/routes'
import CardAdd from 'components/CardAdd/Card'

const ContainerEditPapers = () => {
  const { data = [], handleDeleteData } = useAxiosInstance({ url: METHOD_PAPER })

  return (
    <div>
      <h1>Редактирование статей</h1>
      <div className={'row-wrap-3'}>
        <CardAdd text={'Добавить'} to={ADD_PAPER_PAGE} />
        {
          _.map(data, (item, key) => (
            <Card {...item} key={key}
                  onDelete={() => handleDeleteData(item.id)}
                  editLink={ADD_PAPER_PAGE}
            />
          ))
        }
      </div>
    </div>
  )
}
export default ContainerEditPapers
