import React, {Component} from 'react';

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
      <p>©Copyright 2019-2020</p>
      <p>All rights reserved. Powered by Team#One</p>
      </footer>
      </React.Fragment>
    );
  }
}
