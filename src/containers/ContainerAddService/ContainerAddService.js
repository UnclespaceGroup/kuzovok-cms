import React from 'react'
import { fields } from './fields'
import { useLocation } from 'react-router'
import { METHOD_SERVICE } from 'constants/url'
import { SERVICES_PAGE } from 'constants/routes'
import ContainerForm from 'containers/ContainerForm/ContainerForm'

const ContainerAddService = () => {
  const location = useLocation()
  const prevData = location.state || {}

  return (
    <ContainerForm
      title={'Добавление услуги'}
      name={'services'}
      backUrl={SERVICES_PAGE}
      prevData={prevData}
      fields={fields}
      sendMethod={METHOD_SERVICE}
    />
  )
}
export default ContainerAddService
