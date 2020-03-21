import React from 'react'
import { useLocation } from 'react-router'
import { fields } from './fields'
import ContainerForm from 'containers/ContainerForm/ContainerForm'
import { METHOD_PAPER } from 'constants/url'
import { PAPERS_PAGE } from 'constants/routes'

const ContainerAddPaper = () => {
  const location = useLocation()
  const prevData = location.state || {}

  return (
    <ContainerForm
      prevData={prevData}
      fields={fields}
      name={'paper'}
      backUrl={PAPERS_PAGE}
      sendMethod={METHOD_PAPER}
    />
  )
}
export default ContainerAddPaper
