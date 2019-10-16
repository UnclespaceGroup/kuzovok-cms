import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { ADD_WORK_PAGE, HOME_PAGE, WORKS_PAGE } from '../../constants/ROUTES'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href={HOME_PAGE}><Link to={HOME_PAGE}>Кузовок CMS</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link><Link to={HOME_PAGE}>Главная</Link></Nav.Link>
          <NavDropdown title="Работы" id="basic-nav-dropdown">
            <NavDropdown.Item ><Link to={ADD_WORK_PAGE}>Добавить</Link></NavDropdown.Item>
            <NavDropdown.Item ><Link to={WORKS_PAGE}>Просмотреть</Link></NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default Header
