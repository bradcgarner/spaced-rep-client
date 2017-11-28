import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import {SubmissionError} from 'redux-form';

export const LOAD_USER = 'LOAD_USER';
export const loadUser = (user) => ({
  type: LOAD_USER,
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  authToken: user.authToken
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