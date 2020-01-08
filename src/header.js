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
                      if (window.confirm("Are you sure to leave this mode? All progress will be lost.")){
                        this.props.history.push('/');
                      }
                    } else this.props.history.push('/');

        }}><img src={logo} alt="head"/></div>

      </header>
      <div className="blue"></div>
      <Navbar>
        <Nav>
          <NavLink href="/quiz" className={(this.props.location.pathname.includes("/quiz") ? "active" : "")}>Quiz</NavLink>
          <NavLink href="/customquiz" className={(this.props.location.pathname.includes("/custom") ? "active" : "")}>Custom quiz</NavLink>
          <NavLink href="/profile" className={(this.props.location.pathname.includes("/profile") ? "active" : "")}>Profile</NavLink>
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
