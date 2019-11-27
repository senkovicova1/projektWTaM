import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import Navigation from './navigation';

import config from './firebase';
import Firebase from 'firebase';
import base from 're-base';

import './scss/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = Firebase.initializeApp(config);
let db = Firebase.firestore(app);
const settings = { };
db.settings(settings);
export let rebase = base.createClass(db);
export let firebase = db;

const Root = () => {
  return(
    <div>
      <BrowserRouter>
        <div>
          <Route path='/' component={Navigation} />
        </div>
      </BrowserRouter>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
