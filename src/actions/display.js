import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'

export const GO_TO_SIGNUP = 'GO_TO_SIGNUP';
export const goToSignup = () => ({
  type: GO_TO_SIGNUP,
  view: 'signupPage'
})

export const GO_TO_LOGIN = 'GO_TO_LOGIN';
export const goToLogin = () => ({
  type: GO_TO_LOGIN,
  view: 'loginPage'
})

export const GO_TO_QUESTIONS = 'GO_TO_QUESTIONS';
export const goToQuestions = () => ({
  type: GO_TO_QUESTIONS,
  view: 'questionsPage'
})

export const GO_TO_LANDING = 'GO_TO_LANDING';
export const goToLanding = () => ({
  type: GO_TO_LANDING,
  view: 'landingPage'
})