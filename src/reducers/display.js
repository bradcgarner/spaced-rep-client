import * as actions from '../actions/display'

const initialState = {
  view: 'landingPage'
}

export const reducer = (state = initialState, action) => {

  if (action.type === actions.GO_TO_SIGNUP) {
    return Object.assign({}, state, {
      view: action.view
    }) 
  } 
  else if (action.type === actions.GO_TO_LOGIN) {
    return Object.assign({}, state, {
      view: action.view
    }) 
  } 
  else if (action.type === actions.GO_TO_LANDING) {
    return Object.assign({}, state, {
      view: action.view
    }) 
  } 
  else if (action.type === actions.GO_TO_QUESTIONS) {
    return Object.assign({}, state, {
      view: action.view
    }) 
  } 
  else {
    return state;
  }

}