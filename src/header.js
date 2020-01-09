import React, {Component} from 'react';
import { Navbar, Nav, NavLink } from 'reactstrap';
import logo from './scss/logo.png';

export default class Head extends Component {
  constructor(props){
    super(props);
    this.state = {
      vec: [],
    }
  }
  render(){
    return(
      <React.Fragment>

      <header className="home">
      <div className="headerImage" onClick={() => {
        if (this.props.location.pathname.includes("quiz")) {
                      if (window.confirm("Are you sure to leave quiz mode? All progress will be lost.")){
                        this.props.history.push('/');
                      }
                    }
        }}><img src={logo} alt="head"/></div>

      </header>
      <div className="blue"></div>
      <Navbar>
        <Nav>
          <NavLink href="/quiz">Quiz</NavLink>
          <NavLink href="/custom">Custom questions</NavLink>
        </Nav>
      </Navbar>
      <div className="blue2"></div>
      <div className="login">
        <a href="#"  id="butt">Login</a>
      </div>
      </React.Fragment>
    );
  }
}
