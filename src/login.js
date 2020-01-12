import React, {Component} from 'react';
import { Button, Input, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Alert, Spinner  } from 'reactstrap';

import firebase from 'firebase';
import {rebase} from './index';
import { connect } from "react-redux";
import { register, logIn } from "./redux/actions";

import {isEmail} from "./helperFunctions";
import classnames from 'classnames';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeTab: "1",
      saving: false,

      logMail: "",
      logPassword: "",

      regName: "",
      regMail: "",
      regPassword1: "",
      regPassword2: "",

      error: "",
    }
    this.toggle.bind(this);
    this.cancel.bind(this);
    this.logOrReg.bind(this);
  }

  toggle(index){
    this.setState({
      activeTab: index,
    })
  }

  cancel(){
    this.setState({
      activeTab: "1",

      logMail: "",
      logPassword: "",

      regName: "",
      regMail: "",
      regPassword1: "",
      regPassword2: "",

      error: "",
    }, () => this.props.close());
  }

  logOrReg(){
    this.setState({
      saving: true,
    })
    if (this.state.activeTab === "1") {
        firebase.auth().signInWithEmailAndPassword(this.state.logMail, this.state.logPassword).then((res)=>{
  			rebase.get('users/' + res.user.uid, {
  				context: this,
  			}).then((user) => {
          this.setState({
            saving: false,
          }, () => {
            this.props.register({ uid: user.uid, username: user.username});
            this.props.close();
          });
        });
  		}).catch(error => {
        console.log(error);
        this.setState({
          error: error.message
        });
      });
    } else {
      firebase.auth().createUserWithEmailAndPassword(this.state.regMail, this.state.regPassword1).then((res) => {
        let username = this.state.regName;
        let data ={
          username,
        }
        rebase.addToCollection('users', data, res.user.uid)
        .then((user) => {
            this.setState({
              activeTab: "1",
              saving: false,

              logMail: "",
              logPassword: "",

              regName: "",
              regMail: "",
              regPassword1: "",
              regPassword2: "",

              error: "",
            }, () => {
              this.props.logIn({ uid: res.user.uid, username});
              this.props.close();
            });
          }).catch(err => {
            console.log(err);
          //handle error
        });
      }).catch(error => {
        this.setState({
          error: error.message
        });
      });
    }
  }

  render(){
    let IS_DISABLED = true;
    if (this.state.activeTab === "1"){
      IS_DISABLED = this.state.logMail.length === 0 ||
                    this.state.logPassword.length < 6;
    } else if (this.state.activeTab === "2"){
      IS_DISABLED = this.state.regName.length === 0 ||
                    this.state.regMail.length === 0 ||
                    !isEmail(this.state.regMail) ||
                    this.state.regPassword1.length < 6 ||
                    this.state.regPassword2.length < 6 ||
                    this.state.regPassword1 !== this.state.regPassword2;
    }

    return(
      <div>
        <Nav tabs>
         <NavItem>
           <NavLink
             className={classnames({ active: this.state.activeTab === '1' })}
             onClick={() => { this.toggle('1'); }}
           >
             Log in
           </NavLink>
         </NavItem>
         <NavItem>
           <NavLink
             className={classnames({ active: this.state.activeTab === '2' })}
             onClick={() => { this.toggle('2'); }}
           >
             Register
           </NavLink>
         </NavItem>
       </Nav>
     <Alert color="danger" className="flex w-100 m-t-20" isOpen={this.state.error.length > 0} toggle={() => this.setState({error: ""})}>
     {this.state.error}
     </Alert>

     <TabContent activeTab={this.state.activeTab}>
       <TabPane tabId="1">
         <Row className="m-t-10">
           <Col sm="4">
              <label className="m-r-10">Your email:</label>
            </Col>
           <Col sm="8">
             <div className="flex">
               <Input type="email" value={this.state.logMail} onChange={(e) => this.setState({logMail: e.target.value})} />
             </div>
           </Col>
         </Row>
         <Row className="m-t-10">
           <Col sm="4">
             <label className="m-r-10">Password:</label>
           </Col>
          <Col sm="8">
           <div className="flex">
             <Input type="password" value={this.state.logPassword} onChange={(e) => this.setState({logPassword: e.target.value})} />
           </div>
           </Col>
         </Row>
       </TabPane>
       <TabPane tabId="2">
         <Row className="m-t-10">
           <Col sm="4">
             <label className="m-r-10">Your username:</label>
           </Col>
          <Col sm="8">
           <div className="flex">
             <Input value={this.state.regName} onChange={(e) => this.setState({regName: e.target.value})} />
           </div>
           </Col>
         </Row>
         <Row className="m-t-10">
           <Col sm="4">
             <label className="m-r-10">Your email:</label>
           </Col>
          <Col sm="8">
           <div className="flex">
             <Input type="email" value={this.state.regMail} onChange={(e) => this.setState({regMail: e.target.value})} />
           </div>
           </Col>
         </Row>
         <Row className="m-t-10">
           <Col sm="4">
             <label className="m-r-10">Password:</label>
           </Col>
          <Col sm="8">
           <div className="flex">
             <Input type="password" value={this.state.regPassword1} onChange={(e) => this.setState({regPassword1: e.target.value})} />
           </div>
           </Col>
         </Row>
         <Row className="m-t-10">
           <Col sm="4">
             <label className="m-r-10">Repeat password:</label>
           </Col>
          <Col sm="8">
           <div className="flex">
             <Input type="password" value={this.state.regPassword2} onChange={(e) => this.setState({regPassword2: e.target.value})} />
           </div>
           </Col>
         </Row>
       </TabPane>
     </TabContent>

     <Row className="m-t-20">
       <Button className="" onClick={() => this.cancel()}>Cancel</Button>
       { this.state.saving &&
       <Spinner type="grow" className="m-l-auto" color="success" />
       }
       <Button className="m-l-auto" color="success" disabled={IS_DISABLED} onClick={() => this.logOrReg()}>{this.state.activeTab === "1" ? "Log in" : "Register"}</Button>
     </Row>

    </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, { register, logIn })(Login);
