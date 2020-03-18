import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./components/root";
import configureStore from './store/store';

import jwt_decode from 'jwt_decode';
import {setAuthToken} from './util/session_api_util';
import {logout} from './actions/session_actions';



// ReactDOM.render(<Root />, document.getElementById('root'));

document.addEventListener("DOMContentLoaded", () => {
    // let store = configureStore({});
    let store;

    if(localStorage.jwtToken){
        setAuthToken(localStorage.jwtToken);
        const decodedUser = jwt_decode(localStoage.jwtToken);
        const preloadedState = {session: {isAuthenticated: true, user: decodedUser}};
    
        store = configureStore(preloadedState);
        //checking if jwt passed its configuration
        //getting it in seconds
        const currentTime = Date.now()/1000;
        //if decoded expiration time is less than currentTime
        if(decodedUser.exp < currentTime){
            //Logout the user and redirect to the login page
            store.dispatch(logout());
            window.location.href = 'login';
        }

    }else{
        store = configureStore();
    }

    const root = document.getElementById("root");

    ReactDOM.render(<Root store={store} />, root);
})