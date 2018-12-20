import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'

const reducer = reducer
middleware = applyMiddleware(thunk, createLogger())

const store = createStore(reducer, middleware)

export default store
