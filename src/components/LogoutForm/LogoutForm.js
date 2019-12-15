import React from 'react'
import useUserStore from '../../hooks/useUserStore'
import css from './LogoutForm.module.scss'
import { Button } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa'

const LogoutForm = () => {
  const { logOut, user } = useUserStore()
  return (
    <div className={css.container}>
      <div>{user.name}</div>
      <FaUser />
      <Button variant="outline-success" onClick={() => { logOut() }}>Выход</Button>
    </div>
  )
}

export default React.memo(LogoutForm)
