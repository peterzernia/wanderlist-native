import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'

middleware = applyMiddleware(thunk, createLogger())

const store = createStore(reducer, middleware)

export default store
