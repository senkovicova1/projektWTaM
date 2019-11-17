import React, {Component} from 'react';
import { Alert, Button } from 'reactstrap';

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
        <Alert color="info">
          HERE BE MAIN PAGE - THIS WILL HAVE LOGIN LATER
        </Alert>
        <Button
          color="warning"
          onClick={() => this.props.history.push("/quiz")}>
          Click here to go to quiz
        </Button>
      </div>
    )
  }
}
