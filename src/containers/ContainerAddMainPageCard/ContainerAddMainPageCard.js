import React from 'react'
import { useLocation } from 'react-router'
import { METHOD_CARDS } from 'constants/url'
import { fields } from './fields'
import { EDIT_MAIN_PAGE } from 'constants/routes'
import ContainerForm from 'containers/ContainerForm/ContainerForm'

const ContainerAddMainPageCard = () => {
  const location = useLocation()
  const prevData = location.state || {
    type: 'mainPageCard'
  }

  return (
    <ContainerForm
      title={'Добавление карточки главной'}
      name={'mainPageCards'}
      sendMethod={METHOD_CARDS}
      fileFolder={'card'}
      fields={fields}
      prevData={prevData}
      backUrl={EDIT_MAIN_PAGE}
    />
  )
}
export default ContainerAddMainPageCard
