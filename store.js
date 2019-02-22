import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';

//middleware = applyMiddleware(thunk, createLogger())

const store = createStore(reducer, applyMiddleware(thunk))

export default store
