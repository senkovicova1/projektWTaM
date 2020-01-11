import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Quiz from "./quiz";
import Custom from "./custom";
import MainMenu from "./mainMenu";
import Header from "./header";
import Footer from "./footer";

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
        <Route path='/' component={Header} />
        <Route exact path='/' component={MainMenu} />
        <Route path='/quiz' component={Quiz} />
        <Route path='/add-reaction' component={Custom} />
        <Route path='/' component={Footer} />
      </React.Fragment>
    )
  }
}
