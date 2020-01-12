import React, {Component} from 'react';

import {Route} from 'react-router-dom';
import { connect } from "react-redux";
import firebase from 'firebase';
import {rebase} from './index';
import {logIn, logOut} from './redux/actions';

import Quiz from "./quiz";
import Custom from "./custom";
import MainMenu from "./mainMenu";
import Profile from "./profile";
import Header from "./header";
import Footer from "./footer";

class Navigation extends Component {
  constructor(props){
    super(props);
      firebase.auth().onAuthStateChanged((user) => {
      if(user !== null){
        rebase.get('users/'+user.uid, {
          context: this,
        }).then((userData) =>
          this.props.logIn({uid: user.uid, username: userData.username})
        );
      }else{
        this.props.logOut();
      }
    });
  }

  render(){
    return(
      <React.Fragment>
        <Route path='/' component={Header} />
        <Route exact path='/' component={MainMenu} />
        <Route path='/quiz' component={Quiz} />
        <Route path='/add-reaction' component={Custom} />
        <Route path='/profile' component={Profile} />
        <Route path='/' component={Footer} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = () => {
	return { };
};

export default connect(mapStateToProps, {logIn, logOut})(Navigation);
