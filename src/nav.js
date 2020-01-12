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

  const [modal, setModal, isOpen, setIsOpen ] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const location = useLocation();

  const history = useHistory();

  const toggleLogin = () => setModal(!modal);

  var vec = true;

  return (
    <React.Fragment >
      <Navbar light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem  onClick={() => {this.vec = !this.vec}}>
            safsafds
            </NavItem>
            <NavItem>
              <NavLink style={{color: "white"}} href="/quiz" className={(location.pathname.includes("/quiz") ? "active" : "")}>Quiz</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{color: "white"}} href="/add-reaction" className={(location.pathname.includes("/add-reaction") ? "active" : "")}>Add a reaction</NavLink>
            </NavItem>
            {store.getState().user !== null &&
            <NavItem>
              <NavLink style={{color: "white"}} href="/profile" className={(location.pathname.includes("/profile") ? "active" : "")}>Profile</NavLink>
            </NavItem>
            }
            {vec &&
              <NavItem>
                <NavLink style={{color: "orange"}} href="#" div className={(location.pathname.includes("/login") ? "active" : "")} id="butt" onClick={toggleLogin}>Login</NavLink>
              </NavItem>
            }
            {!vec &&
              <NavItem>
                <NavLink style={{color: "orange"}} href="#" div className={(location.pathname.includes("/login") ? "active" : "")} id="butt" onClick={() => {
                  firebase
                     .auth()
                     .signOut()
                     .then(() => {
                       console.log("logged out");
                       store.dispatch(logOut());
                     })
                     .catch(error => {
                       console.log(error);
                     });
                }}>Log out</NavLink>
              </NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </React.Fragment>
  );
}

export default Navigation;
