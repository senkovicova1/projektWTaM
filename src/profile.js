import React, {Component} from 'react';
import { Progress } from 'reactstrap';

import {rebase} from './index';
import { connect } from "react-redux";

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    if (this.props.loggedIn){
      rebase.bindCollection('users', {
          context: this,
          state: 'users',
          withIds: true,
          onFailure(err) {
            console.log(err);
          }
        });
      }
  }

  render(){
    if (!this.props.loggedIn){
      return (<div></div>)
    }
    const USER = (this.state.users ? this.state.users.find(u => u.id === this.props.user.uid) : null);
    return(
        <section className="profile">
          <h1>{`${this.props.user.username}'s profile`}</h1>
          <h2>Statistics</h2>

          {USER &&
            <div className="statistics">
              <h3 className="m-t-20">Balancing quiz</h3>
              <div className="text-center">
                {USER.balancingA} of {USER.balancingQ}
              </div>
              <Progress
                bar
                striped
                color="warning"
                value={USER.balancingA}
                max={USER.balancingQ}>
                {USER.balancingA}
              </Progress>

              <h3 className="m-t-20">Compounds quiz</h3>
              <div className="text-center">
                {USER.compoundsA} of {USER.compoundsQ}
              </div>
              <Progress
                bar
                striped
                value={USER.compoundsA}
                max={USER.compoundsQ}>
                {USER.compoundsA}
              </Progress>

              <h3 className="m-t-20">Synthese from organic chemistry quiz</h3>
              <div className="text-center">
                {USER.organicChemistrySynthesisA} of {USER.organicChemistrySynthesisQ}
              </div>
              <Progress
                bar
                striped
                color="info"
                value={USER.organicChemistrySynthesisA}
                max={USER.organicChemistrySynthesisQ}>
                {USER.organicChemistrySynthesisA}
              </Progress>
            </div>
          }

        </section>
    );
  }
}

const mapStateToProps = (store) => {
  const {user, loggedIn} = store;
  return {user, loggedIn};
};

export default connect(mapStateToProps, {})(Profile);
