import * as actions from '../actions/users'

const initialState = {
  firstName: 'none',
  lastName: 'none',
  username: 'none',
  authToken: 'none',
  loggedIn: false,
  id: null,
  totalScore: 0
}

export const reducer = (state = initialState, action) => {

  if (action.type === actions.LOAD_USER) {
    return Object.assign({}, state, action);
  }

  else if (action.type === actions.UPDATE_SCORE) {
    return Object.assign({}, state, action)
  }

  else {
    return state;
  }

}