// import user from './user';
// import wallet from './wallet';

import { combineReducers } from 'redux';
import userLoginDataReducer from './user';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({
  user: userLoginDataReducer,
});
export default rootReducer;
