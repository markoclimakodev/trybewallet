import { composeWithDevTools } from '@redux-devtools/extension';
import {
  AnyAction, Store, applyMiddleware, legacy_createStore as createStore
} from 'redux';
import thunk from 'redux-thunk';
import { RootReducerState } from '../types/redux';
import rootReducer from './reducers';

declare global {
  interface Window {
    Cypress: any;
    store: Store<RootReducerState, AnyAction>;
  }
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (window.Cypress) {
  window.store = store;
}
export default store;
