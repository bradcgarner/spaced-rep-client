import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'

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
  const url = `${REACT_APP_BASE_URL}/api/auth/login`;
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
    console.log(res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(user=>{
    dispatch(loadUser(user));    
    console.log('user returned at login', user);    
  })
  .catch(error => {
   console.log(error);
  })
}