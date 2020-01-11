import React, { useState } from 'react';
import PropTypes from 'prop-types';
import logo from './scss/logo.png';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {useLocation, useHistory} from "react-router-dom";

import firebase from 'firebase';
import store from "./redux/store";
import { logOut } from "./redux/actions";

import Login from "./login";

const Navigation = (props) => {
  NavbarBrand.propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    // pass in custom element to use
  }

  store.subscribe(() => console.log('Look ma, Redux!!'));

  const [modal, setModal, isOpen, setIsOpen ] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const location = useLocation();

  const history = useHistory();

  const toggleLogin = () => setModal(!modal);

  const LOGGED = store.getState().user !== null;
  console.log(store.getState());

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
            {LOGGED &&
            <NavItem>
              <NavLink style={{color: "white"}} href="/profile" className={(location.pathname.includes("/profile") ? "active" : "")}>Profile</NavLink>
            </NavItem>
            }
            {!LOGGED &&
              <NavItem>
                <NavLink style={{color: "orange"}} href="#" div className={(location.pathname.includes("/login") ? "active" : "")} id="butt" onClick={toggleLogin}>Login</NavLink>
              </NavItem>
            }
            {LOGGED &&
              <NavItem>
                <NavLink style={{color: "orange"}} href="#" div className={(location.pathname.includes("/login") ? "active" : "")} id="butt" onClick={() => {
                  firebase
                     .auth()
                     .signOut()
                     .then(() => {
                       store.dispatch(logOut(null));
                     })
                     .catch(error => {
                     });
                }}>Log out</NavLink>
              </NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>

      <Modal isOpen={modal} toggle={toggleLogin}>
        <ModalBody>
          <Login close={toggleLogin}/>
        </ModalBody>
      </Modal>

    </React.Fragment>
  );
}

export default Navigation;
