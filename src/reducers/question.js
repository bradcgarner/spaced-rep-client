import * as actions from '../actions/question'

const initialState = {
  question: null,
  questionHead: 0,
}

export const reducer = (state = initialState, action) => {

  if (action.type === actions.LOAD_QUESTION) {
    return Object.assign({}, state, {
      question: action.question,
      questionHead: action.questionHead
    })
  }
  
  else {
    return state;
  }

}