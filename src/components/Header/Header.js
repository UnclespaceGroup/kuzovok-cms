import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { HOME_PAGE, HOME_DOCUMENT, } from 'constants/routes'
import { Link } from 'react-router-dom'
import useUserStore from '../../hooks/useUserStore'
import LogoutForm from '../LogoutForm/LogoutForm'

const Header = () => {
  const { user } = useUserStore()

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href={HOME_PAGE} as={Link} to={HOME_PAGE}>Кузовок CMS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={HOME_PAGE} exact={'true'}>Главная</Nav.Link>
          <Nav.Link as={Link} to={HOME_DOCUMENT} exact={'true'}>Документация</Nav.Link>

        </Nav>
        <Nav>
          {
            user && <LogoutForm />
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default Header
