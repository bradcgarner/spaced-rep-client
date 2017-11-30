import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import {SubmissionError} from 'redux-form';


export const LOAD_QUESTION = 'LOAD_QUESTION';
export const loadQuestion = (questionHead, question) => ({
  type: LOAD_QUESTION,
  question,
  questionHead,
});