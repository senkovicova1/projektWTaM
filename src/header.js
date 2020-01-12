import React, {Component} from 'react';
import logo from './scss/logo.png';

import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink,  Modal, ModalBody} from 'reactstrap';

import firebase from 'firebase';
import { connect } from "react-redux";
import { logOut } from "./redux/actions";

import Login from "./login";

class Head extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginOpen: false,
      navOpen: true,
    }
    this.toggleNav.bind(this);
    this.toggleLogin.bind(this);
  }

  toggleNav(){
    this.setState({
      navOpen: !this.state.navOpen,
    })
  }

  toggleLogin(){
    this.setState({
      loginOpen: !this.state.loginOpen,
    })
  }

  render(){
    return(
        <header className="home">
        <div className="headerImage" onClick={() => {
          if (this.props.location.pathname.includes("quiz") || this.props.location.pathname.includes("add-reaction")) {
                        if (window.confirm("Are you sure to leave this mode? All progress will be lost.")){
                          this.props.history.push('/');
                        }
                      } else this.props.history.push('/');
          }}><img src={logo} alt="head"/></div>
          <Navbar light expand="md">
            <NavbarToggler onClick={() => this.toggleNav()} />
            <Collapse isOpen={this.state.navOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink style={{color: "white"}} onClick={() => this.props.history.push("/quiz")} className={(this.props.location.pathname.includes("/quiz") ? "active" : "")}>Quiz</NavLink>
                </NavItem>
                {this.props.loggedIn &&
                  <NavItem>
                    <NavLink style={{color: "white"}} onClick={() => this.props.history.push("/add-reaction")}  className={(this.props.location.pathname.includes("/add-reaction") ? "active" : "")}>Add a reaction</NavLink>
                  </NavItem>
                }
                {this.props.loggedIn &&
                  <NavItem>
                    <NavLink style={{color: "white"}} onClick={() => this.props.history.push("/profile")}  className={(this.props.location.pathname.includes("/profile") ? "active" : "")}>Profile</NavLink>
                  </NavItem>
                }
                {!this.props.loggedIn &&
                  <NavItem>
                    <NavLink style={{color: "orange"}} id="butt" onClick={() => this.toggleLogin()}>Login</NavLink>
                  </NavItem>
                }
                {this.props.loggedIn &&
                  <NavItem>
                    <NavLink style={{color: "orange"}} id="butt" onClick={() => {
                      firebase
                         .auth()
                         .signOut()
                         .then(() => {
                           this.props.logOut();
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

          <Modal isOpen={this.state.loginOpen} toggle={() => this.toggleLogin()}>
            <ModalBody>
              <Login close={() => this.toggleLogin()}/>
            </ModalBody>
          </Modal>
        </header>
    );
  }
}

const mapStateToProps = (store) => {
  const {loggedIn} = store;
  return {loggedIn};
};

export default connect(mapStateToProps, { logOut })(Head);
