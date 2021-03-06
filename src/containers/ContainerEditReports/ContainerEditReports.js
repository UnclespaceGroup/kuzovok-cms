import React from 'react'
import { useParams } from 'react-router'
import useAxiosInstance from 'hooks/useAxiosInstance'
import { METHOD_REPORT, METHOD_WORK } from 'constants/url'
import _ from 'lodash'
import SectionReport from 'components/SectionReport/SectionReport'
import { ADD_REPORT_PAGE, ADD_WORK_PAGE, NEW_ITEM } from 'constants/routes'
import Banner from 'components/Banner/Banner'
import CardAdd from 'components/CardAdd/Card'
import moment from 'moment'

const ContainerEditReports = () => {

  const { parentId } = useParams()

  const { data = [], handleDeleteData } = useAxiosInstance({ url: METHOD_REPORT, where: { parentId } })
  const { data: parent = {} } = useAxiosInstance({ url: METHOD_WORK, where: { id: parentId }, single: true })

  const sortedData = _.sortBy(data, o => moment(o.date).format('YYYYMMDD')).reverse()

  return (
    <div >
      <Banner title={parent.title}
              text={parent.annotation}
              banner={parent.banner}
              path={ADD_WORK_PAGE}
              id={parent.id}
      />
      <CardAdd big to={{
        pathname: ADD_REPORT_PAGE + NEW_ITEM,
        state: {parentTitle: parent.title, parentId}
      }} />
      {
        _.map(sortedData, (item, key) => (
          <SectionReport
            toEditLink={{
              pathname: ADD_REPORT_PAGE + item.id,
              state: {...item, parentTitle: parent.title, parentId}
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
