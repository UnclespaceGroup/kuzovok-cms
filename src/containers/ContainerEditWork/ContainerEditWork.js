import React from 'react'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_WORK } from 'constants/url'
import _ from 'lodash'
import { ADD_WORK_PAGE, NEW_ITEM, REPORTS_PAGE } from 'constants/routes'
import Card from 'components/Card/Card'
import Padding from 'components/Padding/Padding'
import CardAdd from 'components/CardAdd/Card'
import moment from 'moment'

const ContainerEditWork = () => {
  const { data, handleDeleteData } = useAxiosInstance({ url: METHOD_WORK })
  const sortedData = _.sortBy(data, o => moment(o.date).format('YYYYMMDD')).reverse()
  return (
    <div>
      <h1>Машины в ремонте</h1>
      <Padding value={10} />
      <div className={'row-wrap-3'}>
        <CardAdd to={ADD_WORK_PAGE + NEW_ITEM} />
        {
          _.map(sortedData, ({text, ...item}, key) => (
            <Card editLink={ADD_WORK_PAGE + item.id}
                  key={key} {...item}
                  text={item.annotation}
                  onDelete={() => item.id && handleDeleteData(item.id)}
                  to={REPORTS_PAGE + item.id}
            />
          ))
        }
      </div>
    </div>
  )
}
export default ContainerEditWork
