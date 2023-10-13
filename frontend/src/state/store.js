import { applyMiddleware, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import userReducer from './User/userReducer'
import errorReducer from './Errors/errorReducer'
import productReducer from './Products/productReducer'
import cartReducer from './Cart/cartReducer'

const rootReducer = combineReducers({
    userReducer,
    errorReducer,
    productReducer,
    cartReducer
})

export default configureStore(
    {reducer: rootReducer},
    {},
    applyMiddleware(thunk)
)