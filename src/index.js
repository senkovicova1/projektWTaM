import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import Navigation from './navigation';

import config from './firebase';
import Firebase from 'firebase';
import base from 're-base';

import createStore from './redux/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/style.css';

const store = createStore();

const app = Firebase.initializeApp(config);
let db = Firebase.firestore(app);
const settings = { };
db.settings(settings);
export let rebase = base.createClass(db);
export let firebase = db;

const Root = () => {
  return(
    <React.Fragment>
      <Provider store={store}>
        <BrowserRouter>
            <Route path='/' component={Navigation} />
        </BrowserRouter>
      </Provider>
    </React.Fragment>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
