import React, { useMemo } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { ADD_SERVICE_PAGE, ADD_WORK_PAGE, HOME_PAGE, SERVICES_PAGE, WORKS_PAGE } from '../../constants/ROUTES'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginForm from '../LoginForm/LoginForm'
import { actionLogin } from '../../actions/actionLogin'
// import { JWT, USER_NAME } from '../../constants/OTHER'
import { bindActionCreators } from 'redux'
import LogoutForm from '../LogoutForm/LogoutForm'

const Header = ({ user, actionLogin }) => {
  const userName = user
  useMemo(() => {
    // const token = localStorage.getItem(JWT)
    // const name = localStorage.getItem(USER_NAME)
    // if (token || name) actionLogin({ name, token })
  }, [])

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href={HOME_PAGE} as={Link} to={HOME_PAGE}>Кузовок CMS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={HOME_PAGE} exact={'true'}>Главная</Nav.Link>
          <NavDropdown title="Работы" id="basic-nav-dropdown">
            <NavDropdown.Item as={NavLink} to={ADD_WORK_PAGE}>Добавить</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to={WORKS_PAGE}>Просмотреть</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Услуги" id="basic-nav-dropdown">
            <NavDropdown.Item as={NavLink} to={ADD_SERVICE_PAGE}>Добавить</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to={SERVICES_PAGE}>Просмотреть</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          {
            userName
              ? <LogoutForm {...{ userName, actionLogin }} />
              : <LoginForm actionLogin={actionLogin} />
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default connect(
  state => {
    return { user: state.userStore }
  },
  dispatch => {
    return {
      actionLogin: bindActionCreators(actionLogin, dispatch)
    }
  })(Header)
