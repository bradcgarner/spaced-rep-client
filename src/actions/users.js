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

export const GO_TO_SIGNUP = 'GO_TO_SIGNUP';
export const goToSignup = () => ({
  type: GO_TO_SIGNUP
})