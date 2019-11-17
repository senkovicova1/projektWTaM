import React, {Component} from 'react';
import { Alert,Button } from 'reactstrap';

export default class Navigation extends Component {
  constructor(props){
    super(props);
    this.state = {
      vec: [],
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
      </div>
    )
  }
}
