import React from 'react'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_WORK } from 'constants/url'
import _ from 'lodash'
import { ADD_WORK_PAGE, ADD_ADVANTAGES_MAIN, REPORTS_PAGE } from 'constants/routes'
import Card from 'components/Card/Card'
import Padding from 'components/Padding/Padding'
import Link from 'components/Link/Link'

const ContainerEditWork = () => {
  const { data, handleDeleteData } = useAxiosInstance({ url: METHOD_WORK })
  console.log(data)

  return (
    <div>
      <h1>Машины в ремонте</h1>
      <Link to={ADD_ADVANTAGES_MAIN}>Добавить</Link>
      <Padding value={10} />
      <div className={'row-wrap-3'}>
        {
          _.map(data, ({text, ...item}, key) => (
            <Card editLink={ADD_WORK_PAGE}
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
