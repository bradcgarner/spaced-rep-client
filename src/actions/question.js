import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import {SubmissionError} from 'redux-form';


export const LOAD_QUESTION = 'LOAD_QUESTION';
export const loadQuestion = (questionHead, question) => ({
  type: LOAD_QUESTION,
  question,
  questionHead,
  answered: false
});

export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const answerQuestion = (questionHeadNext, questionNext, questionScored) => ({
  type: ANSWER_QUESTION,
  questionNext,
  questionHeadNext,
  questionScored,
  answered: true
});