import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {persistStore, autoRehydrate} from 'redux-persist';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import allReducers from './reducers';

import AppComponent from './components/app.component';
import HomeContainer from './containers/home.container';

import './assets/css/index.css';

import * as firebase from 'firebase';

const store = createStore(allReducers, undefined, autoRehydrate());

const history = syncHistoryWithStore(browserHistory, store);

persistStore(store);

// Use your config (here it's my test firebase app)
const config = {
    apiKey: "AIzaSyCTOHEhc6oj5PHZdXzI17KYljUkEdbcrqI",
    authDomain: "slackproject-759da.firebaseapp.com",
    databaseURL: "https://slackproject-759da.firebaseio.com",
    projectId: "slackproject-759da",
    storageBucket: "slackproject-759da.appspot.com",
    messagingSenderId: "42789530138",
    appId: "1:42789530138:web:8836b27633f8e23e797fa3"
  };

firebase.initializeApp(config);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={AppComponent} >
                <IndexRoute component={HomeContainer} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
