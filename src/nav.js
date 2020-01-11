import React, { useState } from 'react';
import PropTypes from 'prop-types';
import logo from './scss/logo.png';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import {useLocation, useHistory} from "react-router-dom";

const Navigation = (props) => {
  NavbarBrand.propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    // pass in custom element to use
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const location = useLocation();

  const history = useHistory();

  return (
    <React.Fragment>
      <Navbar light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink style={{color: "white"}} href="/quiz" className={(location.pathname.includes("/quiz") ? "active" : "")}>Quiz</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{color: "white"}} href="/add-reaction" className={(location.pathname.includes("/add-reaction") ? "active" : "")}>Add a reaction</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{color: "white"}} href="/profile" className={(location.pathname.includes("/profile") ? "active" : "")}>Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{color: "orange"}} href="#" div className={(location.pathname.includes("/login") ? "active" : "")} id="butt">Login</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </React.Fragment>
  );
}

export default Navigation;
