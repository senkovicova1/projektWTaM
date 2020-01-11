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
      <div class="iconbox">
        <a href="https://www.fpharm.uniba.sk/pracoviska/katedra-chemickej-teorie-lieciv/" target="_blank"><i class="fa fa-university" id="ico"></i></a>
        <a href="https://www.acs.org/content/acs/en/careers/college-to-career/areas-of-chemistry/organic-chemistry.html" target="_blank"><i class="fa fa-flask" id="ico"></i></a>
        <a href="https://www.organic-chemistry.org/namedreactions/" target="_blank"><i class="fa fa-link" id="ico"></i></a>
      </div>
      </footer>
      </React.Fragment>
    );
  }
}
