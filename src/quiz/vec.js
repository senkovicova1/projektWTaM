import React, {Component} from 'react';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default class Vec extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      pass: "",
      modalOpen: false,
      isAdmin: true,
    }
    this.modal.bind(this);
  }

  componentWillMount(){
    // rebase.get veci y data
  }

  componentWillReceiveProps(props){
    if (this.props.username != props.username){
      this.setState({

      })
    }
  }

  modal(){
    this.setState({
      modalOpen: !this.state.modalOpen,
    })
  }

  render(){
  //  console.log(this.props);
  //  this.props.napisNieco();
    return(
      <div style={{padding: "20px"}}>
        <Button color="danger" onClick={() => this.modal()}>Otvor mdodal</Button>
        <Modal isOpen={this.state.modalOpen} toggle={() => this.modal()}>
          <ModalHeader toggle={() => this.modal()}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.modal()}>Do Something</Button>{' '}
            <Button color="secondary" onClick={() => {console.log("hello");}}>Hello</Button>
          </ModalFooter>
        </Modal>
        {!this.state.isAdmin &&
          <div>
          Ahoj
        </div>
        }
        {this.state.isAdmin &&
          <div>
          Zbohom
        </div>

        }
          <input className="" style={{ backgroundColor: "cyan"}} value={this.state.username} onChange={(e) => {this.setState({username: e.target.value}) }} />
      </div>
    )
  }
}
