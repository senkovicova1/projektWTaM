import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import Navigation from './navigation';

import config from './firebase';
import Firebase from 'firebase';
import base from 're-base';

import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/style.css';
//import './scss/generatedCSS.css';


const app = Firebase.initializeApp(config);
let db = Firebase.firestore(app);
const settings = { };
db.settings(settings);
export let rebase = base.createClass(db);
export let firebase = db;

const Root = () => {
  return(
    <React.Fragment>
      <BrowserRouter>
        <React.Fragment>
          <Route path='/' component={Navigation} />
        </React.Fragment>
      </BrowserRouter>
    </React.Fragment>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
