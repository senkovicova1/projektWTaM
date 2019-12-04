import React, {Component} from 'react';

import logo from './scss/logo.png';

const Header = ({title}) => (<header></header>);

export default class Footer extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return(
      <React.Fragment>
      <footer>
      <p>©Team#One</p>
      </footer>
      </React.Fragment>
    );
  }
}
