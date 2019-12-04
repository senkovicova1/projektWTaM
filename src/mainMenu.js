import React, {Component} from 'react';
import { Alert, Button, Navbar, Nav, NavLink } from 'reactstrap';
import logo from './scss/logo.png';
import trylogo from './scss/try.png';
import head from './scss/headerimg.png';


import Header from './header';
const Footer = ({title}) => (<footer>{title}</footer>);

export default class Navigation extends Component {
  constructor(props){
    super(props);
    this.state = {
      vec: [],
    }
  }
  render(){
    return(
      <React.Fragment>
      <section className="sec">
      <div>
       <h2>About us</h2>
        <p>The application was developed as an auxilary software for students and helps
        them by practising and learning chemical reactions.
        Students don't need to draw on paper anymore and they get feedback for their sollutions.</p>
        <p>This software allows the users to test their knowledge on exiting examples
        in form of a quiz or they can create their own reactions and tasks.</p>
        <p>In the Materials section are their uploaded materials on chemistry theory.</p>
      </div>
      </section>
      <aside>
      <img src={trylogo} onClick={() => {
          this.props.history.push('/quiz');
        }}className="try" alt="try"/>
      </aside>
      </React.Fragment>
      /*
      <div style={{padding: "20px"}}>
        <Alert color="info">
          HERE BE MAIN PAGE - THIS WILL HAVE LOGIN LATER
        </Alert>
        <Button
          color="warning"
          onClick={() => this.props.history.push("/quiz")}>
          Click here to go to quiz
        </Button>
      </div>
      */
    );
  }
}
