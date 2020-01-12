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
      <p>©Copyright 2019-2020 Chemistry quiz</p>
      <p>All rights reserved. Powered by Team#One</p>
      <div className="iconbox">
        <a href="https://www.fpharm.uniba.sk/pracoviska/katedra-chemickej-teorie-lieciv/" rel="noopener noreferrer" target="_blank"><i className="fa fa-university" id="ico"></i></a>
        <a href="https://www.acs.org/content/acs/en/careers/college-to-career/areas-of-chemistry/organic-chemistry.html" rel="noopener noreferrer" target="_blank"><i className="fa fa-flask" id="ico"></i></a>
        <a href="https://www.organic-chemistry.org/namedreactions/" rel="noopener noreferrer" target="_blank"><i className="fa fa-link" id="ico"></i></a>
      </div>
      </footer>
      </React.Fragment>
    );
  }
}
