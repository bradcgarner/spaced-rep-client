import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import {SubmissionError} from 'redux-form';
import * as actionsDisplay from './display';
import * as actionsQuestion from './question';

export const LOAD_USER = 'LOAD_USER';
export const loadUser = (user) => ({
  type: LOAD_USER,
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  authToken: user.authToken,
  loggedIn: true,
  id: user.id,
  totalScore: user.totalScore,
});

export const UPDATE_SCORE = 'UPDATE_SCORE';
export const updateScore = (totalScore, right) => ({
  type: UPDATE_SCORE,
  totalScore,
  right
});


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
  return fetch(url,init)
      .then(user => {
        return user.json()
      })
      .then(user=>{  // user should return with initial question and questionHead
        const { questionHead, question } = user;
        dispatch(loadUser(user));
        return dispatch(actionsQuestion.loadQuestion( questionHead, question)); 
      })
      .then(()=>{
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

 export const answerQuestion = (userId, authToken, answer, question, questionHead) => dispatch => {
  const url = `${REACT_APP_BASE_URL}/api/users/${userId}/questions`;
  const headers = {
    'content-type': 'application/json',
    "Authorization": `Bearer ${authToken}`, 
  }; 

  const questionObject = {
    question,
    questionHead,
    answer,
  }
  const init = { 
    method: 'PUT',
    headers,
    body: JSON.stringify(questionObject)

  };
  return fetch(url, init)    
  .then(res=>{
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(question=>{
    dispatch(updateScore(
      question.totalScore,
      question.right
    ))
    return dispatch(actionsQuestion.answerQuestion(
      question.questionHeadNext, 
      question.questionNext,
      question.scoredQuestion
    )); // res should be {question, questionHead}
  })
  .catch(error => {
   console.log(error);
  })
}