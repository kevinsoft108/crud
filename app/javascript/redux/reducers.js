import { combineReducers } from 'redux';

import todos from './slices/todos';

const rootReducer = combineReducers({ todos });

export default rootReducer;
