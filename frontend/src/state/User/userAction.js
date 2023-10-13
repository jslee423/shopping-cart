import * as actionTypes from '../actionTypes'
import axios from 'axios'
import { ADD_ERROR_TO_STORE } from '../Errors/errorAction'
import { GET_USER_CART } from '../Cart/cartAction'

export const ADD_USER_TO_STORE = (newUser) => {
    return {
        type:  actionTypes.ADD_USER_TO_STORE,
        payload: newUser
    }
}

export const SAVE_USER_TO_DB = (user, navigate) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/user/signup', user)
        .then((response) => {
            const signedUser = response.data
            // console.log(response)
            // console.log(signedUser)
            dispatch(ADD_USER_TO_STORE(signedUser))
            navigate('/')
        })
        .catch((error) => {
            console.log(error)
            dispatch(ADD_ERROR_TO_STORE(error.response.status, error.response.data))
        })
    }
}

export const LOGIN_USER = (username, password, navigate) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/user/login', {userName: username, password: password})
        .then((response) => {
            const signedUser = response.data
            // console.log("login response ", signedUser)
            dispatch(ADD_USER_TO_STORE(signedUser))
            dispatch(GET_USER_CART(signedUser._id))
            navigate('/')
        })
        .catch((error) => {
            // console.log("login error ", error.response)
            // console.log("status ", error.response.status)
            // console.log("message ", error.response.message)
            // return error
            dispatch(ADD_ERROR_TO_STORE(error.response.status, error.response.data))
        })
    }
}