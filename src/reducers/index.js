import { combineReducers } from 'redux';
import { reducer as users} from './users';
import { reducer as display} from './display';

export default combineReducers({
  users,
  display
});