import * as actions from '../actions/users'

const initialState = {
  firstName: 'none',
  lastName: 'none',
  username: 'none',
  authToken: 'none',
  loggedIn: false,
  questions: [],
  questionHead: 0,
  id: null
}

export const reducer = (state = initialState, action) => {

  if (action.type === actions.LOAD_USER) {
    return Object.assign({}, state, action);
  }
  else if (action.type === actions.FETCH_AND_SAVE_QUESTIONS_SUCCESS) {
    return Object.assign({}, state, {
      questions: action.questions,
      questionHead: 0,
      loggedIn: false
    })
  }
  else if (action.type === actions.UPDATE_SCORE) {
    return Object.assign({}, state, {
      questions: action.questions,
      questionHead: action.questionHead
    })
  }
  
  else {
    return state;
  }

}