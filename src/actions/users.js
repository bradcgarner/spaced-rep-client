import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import {SubmissionError} from 'redux-form';
import * as actionsDisplay from './display';

export const LOAD_USER = 'LOAD_USER';
export const loadUser = (user) => ({
  type: LOAD_USER,
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  authToken: user.authToken,
  loggedIn: true,
  questions: user.questions,
  questionHead: user.questionHead
});

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const getAllUsers = () => ({
  type: LOAD_USER,
  firstName: 'user.firstName',
  lastName: 'user.lastName',
  username: 'user.username',
  authToken: 'user.authToken'
});

export const testLoadAllUsers = () => dispatch => {
  const url = `${REACT_APP_BASE_URL}/api/users`;
  const headers = {
    "x-requested-with": "xhr"
  }; 
  const init = { 
    method: 'GET',
    headers
  };
  let fetchedUser;
  console.log('init', init);
  return fetch(url, init)    
  .then(res=>{
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(user=>{
    dispatch(loadUser(user[0]));    
    console.log('user returned at login', user);    
  })
  .catch(error => {
   console.log(error);
  })
}

export const registerUser = user => dispatch => {
  return fetch(`${REACT_APP_BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(user)
  })
      .then(res => res.json())
      .catch(err => {
          const {reason, message, location} = err;
          if (reason === 'ValidationError') {
              // Convert ValidationErrors into SubmissionErrors for Redux Form
              return Promise.reject(
                  new SubmissionError({
                      [location]: message
                  })
              );
          }
      });
};

export const login = user => dispatch => {
  const url = `${REACT_APP_BASE_URL}/api/auth/login`;
  const auth = `${user.username}:${user.password}`; // u & pw as string
  const headers = {
    "Authorization": "Basic " + btoa(auth), // base64 encryption
    "x-requested-with": "xhr"
  }; 
  const init = { 
    method: 'POST',
    headers
  };
  console.log('log in init',init)
  return fetch(url,init)
      .then(user => {
        return user.json()
      })
      .then(user=>{
        console.log('returned user', user)
        return dispatch(loadUser(user));
      })
      .then(()=>{
        console.log('go to questions');
        return dispatch(actionsDisplay.goToQuestions())        
      })
      .catch(err => {
          const {reason, message, location} = err;
          if (reason === 'ValidationError') {
              // Convert ValidationErrors into SubmissionErrors for Redux Form
              return Promise.reject(
                  new SubmissionError({
                      [location]: message
                  })
              );
          }
      });
};