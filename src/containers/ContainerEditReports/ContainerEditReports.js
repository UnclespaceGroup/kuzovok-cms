import React from 'react'
import { useParams } from 'react-router'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_REPORT, METHOD_WORK } from 'constants/url'
import _ from 'lodash'
import SectionReport from 'components/SectionReport/SectionReport'
import { ADD_REPORT_PAGE } from 'constants/routes'
import Banner from 'components/Banner/Banner'

const ContainerEditReports = () => {

  const { parentId } = useParams()

  const { data = [], handleDeleteData } = useAxiosInstance({ url: METHOD_REPORT, where: { parentId } })
  const { data: parent = {} } = useAxiosInstance({ url: METHOD_WORK, where: { id: parentId }, single: true })

  return (
    <div >
      <Banner title={parent.title}
              text={parent.annotation}
              banner={parent.banner}
      />
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