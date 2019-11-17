import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Quiz from "./quiz";
import MainMenu from "./mainMenu";

export default class Navigation extends Component {
  constructor(props){
    super(props);
    this.state = {
      vec: [],
    }
  }

  render(){
    return(
      <div>
        <Route exact path='/' component={MainMenu} />
        <Route path='/quiz' component={Quiz} />
      </div>
    )
  }
}
