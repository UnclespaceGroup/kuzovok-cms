import React from 'react'
import { useLocation } from 'react-router'
import { METHOD_MAIN_PAGE_CARDS } from 'constants/url'
import { fields } from './fields'
import { EDIT_MAIN_PAGE } from 'constants/routes'
import ContainerForm from 'containers/ContainerForm/ContainerForm'


const ContainerAddMainPageCard = () => {
  const location = useLocation()
  const prevData = location.state || {}

  return (
    <ContainerForm
      name={'mainPageCards'}
      sendMethod={METHOD_MAIN_PAGE_CARDS}
      fields={fields}
      prevData={prevData}
      backUrl={EDIT_MAIN_PAGE}
    />
  )
}
export default ContainerAddMainPageCard
