import React, {Component} from 'react';
import { Button, Navbar, Nav, NavLink } from 'reactstrap';
import logo from './scss/logo.png';
import head from './scss/headerimg.png';

const Header = ({title}) => (<header></header>);

export default class Head extends Component {
  constructor(props){
    super(props);
    this.state = {
      vec: [],
    }
  }
  render(){
    return(
      <div className="home">
      <div className="headerImage"><img src={head} alt="head"/></div>
      <Navbar>
        <Nav>
          <NavLink href="#"><img src={logo} height="50" width="50"/></NavLink>
          <NavLink href="/quiz">Quiz</NavLink>
          <NavLink href="#pricing">Custom questions</NavLink>
          <Button className="login">Login
          </Button>
        </Nav>
      </Navbar>
      </div>
    );
  }
}
