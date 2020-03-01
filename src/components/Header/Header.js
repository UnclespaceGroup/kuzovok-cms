import React from 'react'
import { HOME_PAGE, HOME_DOCUMENT, } from 'constants/routes'
import { Link } from 'react-router-dom'
import useUserStore from '../../hooks/useUserStore'
import LogoutForm from '../LogoutForm/LogoutForm'
import css from './Header.module.scss'

const Header = () => {
  const { user } = useUserStore()

  return (
    <div className={css.container}>
      <Link className={css.logo} href={HOME_PAGE} as={Link} to={HOME_PAGE}>Кузовок CMS</Link>
      <Link as={Link} to={HOME_PAGE} exact={'true'}>Главная</Link>
      <Link as={Link} to={HOME_DOCUMENT} exact={'true'}>Документация</Link>
      <div className={css.user}>
        {
          user && <LogoutForm />
        }
      </div>
    </div>
  )
}
export default Header
