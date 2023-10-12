import { applyMiddleware, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import userReducer from './User/userReducer'
import errorReducer from './Errors/errorReducer'

const rootReducer = combineReducers({
    userReducer,
    errorReducer
})

export default configureStore(
    {reducer: rootReducer},
    {},
    applyMiddleware(thunk)
)