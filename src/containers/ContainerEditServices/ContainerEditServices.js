import React from 'react'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_SERVICE } from 'constants/url'
import _ from 'lodash'
import Card from 'components/Card/Card'
import { ADD_SERVICE_PAGE } from 'constants/routes'

const ContainerEditServices = () => {
  const { data, handleDeleteData } = useAxiosInstance({ url: METHOD_SERVICE })
  return (
    <div>
      <div className={'row-wrap-3'}>
        {
          _.map(data, ({ title, banner, id, ...props }, key) => (
            <Card key={key}
                  id={id}
                  {...props}
                  title={title}
                  banner={banner}
                  onDelete={() => handleDeleteData(id)}
                  editLink={ADD_SERVICE_PAGE}
            />
          ))
        }
      </div>
    </div>
  )
}
export default ContainerEditServices
