import { combineReducers } from 'redux';
import { reducer as users} from './users';
import { reducer as display} from './display';
import { reducer as form } from 'redux-form';

export default combineReducers({
  users,
  display,
  form
});