import * as actions from '../actions/question'

const initialState = {
  questionHead: 0,
  questionHeadNext: 0,  
  answered: false,
  question: {
    brit: '',
    us: '',
    nextIndex: '',
    score: '',
  },  
  questionNext: {
    brit: '',
    us: '',
    nextIndex: '',
    score: '',
  },
  questionScored: {
    brit: '',
    us: '',
    nextIndex: '',
    score: '',
  }
}

export const reducer = (state = initialState, action) => {

  if (action.type === actions.LOAD_QUESTION) {
    return Object.assign({}, state, {
      question: action.question,
      questionHead: action.questionHead,
      answered: action.answered
    })
  }
  else if (action.type === actions.ANSWER_QUESTION) {
    return Object.assign({}, state, {
      questionNext: action.questionNext,
      questionHeadNext: action.questionHeadNext,
      questionScored: action.questionScored,
      answered: action.answered
    })
  }
  
  else {
    return state;
  }

}