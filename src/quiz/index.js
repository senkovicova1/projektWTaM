import React, {Component} from 'react';
import { Alert,Button } from 'reactstrap';
import Vec from "./vec";

export default class Quiz extends Component {
  constructor(props){
    super(props);
    this.state = {
      vec: [],
      prop: "Som prop od Quiz",
    }
  }
  render(){
    return(
      <div style={{padding: "20px"}}>
        <Alert color="warning">
          HERE BE QUIZ
        </Alert>
        <Button
          color="info"
          onClick={() => this.props.history.push("/")}>
          Click here to go back
        </Button>

        <Vec pozdrav={this.state.prop} napisNieco={() => console.log("pisem nieco")}/>
      </div>
    )
  }
}
