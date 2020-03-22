import React from 'react'
import { useLocation } from 'react-router'
import { METHOD_REPORT } from 'constants/url'
import { fields } from './fields'
import { useHistory } from 'react-router'
import ContainerForm from 'containers/ContainerForm/ContainerForm'

const ContainerAddReport = () => {
  const location = useLocation()
  const history = useHistory()

  const prevData = location.state || {}

  return (
    <ContainerForm
      title={'Отчет по работе'}
      name={'report'}
      fileFolder={`works/${prevData.parentId}/reports`}
      sendMethod={METHOD_REPORT}
      fields={fields}
      prevData={prevData}
      onBackClick={() => history.goBack()}
    />
  )
}
export default ContainerAddReport
