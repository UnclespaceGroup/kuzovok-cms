import React from 'react'
import { useLocation } from 'react-router'
import { METHOD_ADVANTAGES_MAIN } from 'constants/url'
import { fields } from './fields'
import { EDIT_MAIN_PAGE } from 'constants/routes'
import ContainerForm from 'containers/ContainerForm/ContainerForm'

const ContainerAddAdvantagesMain = () => {
  const location = useLocation()
  const prevData = location.state || {}

  return (
    <ContainerForm
      name={'advantages'}
      backUrl={EDIT_MAIN_PAGE}
      prevData={prevData}
      fields={fields}
      sendMethod={METHOD_ADVANTAGES_MAIN}
    />
  )
}
export default ContainerAddAdvantagesMain
