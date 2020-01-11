import React from 'react'
import { FAIL, OK } from 'constants/statuses'
import { Alert } from 'react-bootstrap'

const statusText = {
  [OK]: 'Успешно отправлено',
  [FAIL]: 'Не отправлено, что то пошло не так :\'('
}

const alertValue = {
  [OK]: 'success',
  [FAIL]: 'danger'
}

const SectionStatus = ({ status }) => (
  <Alert variant={alertValue[status]} >
    {statusText[status]}
  </Alert>
)
export default SectionStatus
