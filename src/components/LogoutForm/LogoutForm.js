import React from 'react'
import css from './LogoutForm.module.scss'
import { Button } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa'

const LogoutForm = ({ userName, actionLogin }) => (
  <div className={css.container}>
    <div>{userName.name}</div>
    <FaUser />
    <Button variant="outline-success" onClick={() => { actionLogin() }}>Выход</Button>
  </div>
)

export default React.memo(LogoutForm)
