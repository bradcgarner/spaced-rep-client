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
  questionHead: user.questionHead,
  id: user.id
});

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const getAllUsers = () => ({
  type: LOAD_USER,
  firstName: 'user.firstName',
  lastName: 'user.lastName',
  username: 'user.username',
  authToken: 'user.authToken'
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
export const FETCH_AND_SAVE_QUESTIONS_SUCCESS = 'FETCH_AND_SAVE_QUESTIONS_SUCCESS';
export const fetchAndSaveQuestionSuccess = (questions) => ({
  type: FETCH_AND_SAVE_QUESTIONS_SUCCESS,
  questions
});

export const fetchAndSaveQuestions = () => dispatch => {
  const url = `${REACT_APP_BASE_URL}/api/questions`;
  const headers = {
    "x-requested-with": "xhr"
  }; 
  const init = { 
    method: 'GET',
    headers
  };
  let fetchedUser;
  return fetch(url, init)    
  .then(res=>{
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(questions=>{
    dispatch(fetchAndSaveQuestionSuccess(questions))      
  })
  .catch(error => {
   console.log(error);
  })
}

export const UPDATE_SCORE = 'UPDATE_SCORE';
export const updateScore = (user) => ({
  type: UPDATE_SCORE,
  questions: user.questions,
  questionHead: user.questionHead,
});

 export const answerQuestions = (value, user) => dispatch => {
   const newQuestions = [...user.questions]
   const questionHead = user.questionHead
   const newQuestionHead = newQuestions[questionHead].nextIndex
    console.log(newQuestions)
    newQuestions[questionHead].score = scoreAnswer(value, newQuestions[questionHead])
    console.log(newQuestions[questionHead].score);
    reposition(newQuestions, newQuestions[questionHead], questionHead);
    const updatedQuestions = {questions: newQuestions, questionHead: newQuestionHead}
    dispatch(updateScore(updatedQuestions));
    if (user.loggedIn) fetchAndSaveAnswers(user, updatedQuestions);
    // push updatedQuestions object to the server. 
 }

 const reposition = (array, questionCurrent, questionCurrentIndex) => {
  // initialize loop
  let loopCurrent = array[questionCurrentIndex];
  let loopNextIndex = loopCurrent.nextIndex;
  let loopPrevious;
  // loop thru and find slot at end of matching values, i.e. if we have a 2, find last 2, then stop
  for (let i = 0; i <= questionCurrent.score && i <= array.length; i++) {
    loopPrevious = loopCurrent;
    loopNextIndex = loopCurrent.nextIndex;
    loopCurrent = array[loopNextIndex];
  }
  // once loop completes, insert current question in that slot
  array[questionCurrentIndex].nextIndex = loopNextIndex
  loopPrevious.nextIndex = questionCurrentIndex
}

const scoreAnswer = (value, questionObject) => {
  const correct = 2;
  const incorrect = .5;
  let score;
  if (value === questionObject.us) {
      score = questionObject.score * correct;       
  } 
  else {
      score = Math.ceil(questionObject.score * incorrect);       
    } 
  return score;
};


export const fetchAndSaveAnswers = (user, questions) => {
  const url = `${REACT_APP_BASE_URL}/api/users/${user.id}/questions`;
  const headers = {
    "x-requested-with": "xhr",
    'content-type': 'application/json',
    "Authorization": `Bearer ${user.authToken}`, 
  }; 
  const init = { 
    method: 'PUT',
    headers,
    body: JSON.stringify(questions)
  };
  console.log('url at save answers',url);
  console.log('init at save answers',init);
  return fetch(url, init)    
  .then(res=>{
    console.log('response from fetch',res)
    if (!res.ok) { 
      console.log('!ok res.statusText', res.statusText)
      return Promise.reject(res.statusText);
    }
    console.log('ok res.json',res.json)
    return res.json();
  })
  .catch(error => {
   console.log(error);
  })
}