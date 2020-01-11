import React, {Component} from 'react';
import logo from './scss/logo.png';
import Navigation from './nav';

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
        if (this.props.location.pathname.includes("quiz") || this.props.location.pathname.includes("add-reaction")) {
                      if (window.confirm("Are you sure to leave this mode? All progress will be lost.")){
                        this.props.history.push('/');
                      }
        } else this.props.history.push('/');

        }}><img src={logo} alt="head"/></div>
        <Navigation></Navigation>
      </header>
      </React.Fragment>
    );
  }
}
