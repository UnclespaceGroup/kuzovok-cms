import React from 'react'
import { useParams } from 'react-router'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_REPORT } from 'constants/url'
import _ from 'lodash'
import SectionReport from 'components/SectionReport/SectionReport'
import { ADD_REPORT_PAGE } from 'constants/routes'

const ContainerEditReports = () => {

  const { parentId } = useParams()

  const { data, handleDeleteData } = useAxiosInstance({ url: METHOD_REPORT, where: { parentId } })

  return (
    <div>
      {
        _.map(data, (item, key) => (
          <SectionReport
            toEditLink={{
              pathname: ADD_REPORT_PAGE,
              state: {...item}
            }}
            key={key} {...item}
            onDelete={() => handleDeleteData(item.id)}
          />
        ))
      }
    </div>
  )
}
export default ContainerEditReports
