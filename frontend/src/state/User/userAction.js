import axios from 'axios'
import * as actionTypes from '../actionTypes'
import { ADD_ERROR_TO_STORE } from '../Errors/errorAction'
import { EMPTY_CART, GET_USER_CART, SAVE_CART_TO_DB } from '../Cart/cartAction'

export const ADD_USER_TO_STORE = (newUser) => {
    return {
        type:  actionTypes.ADD_USER_TO_STORE,
        payload: newUser
    }
}

export const ADD_NOTIFICATION_TO_STORE = (notification) => {
    return {
        type: actionTypes.ADD_NOTIFICATION_TO_STORE,
        payload: notification
    }
}

export const SAVE_USER_TO_DB = (user, navigate) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/user/signup', user)
        .then((response) => {
            const signedUser = response.data
            dispatch(ADD_USER_TO_STORE(signedUser))
            navigate('/')
        })
        .catch((error) => {
            console.log(error)
            dispatch(ADD_ERROR_TO_STORE(error.response.status, error.response.data))
        })
    }
}

export const LOGIN_USER = (username, password, cartList, navigate) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/user/login', {userName: username, password: password})
        .then((response) => {
            const signedUser = response.data
            dispatch(ADD_USER_TO_STORE(signedUser))
            if (cartList.length > 0) {
                dispatch(SAVE_CART_TO_DB(cartList, signedUser._id))
            } else {
                dispatch(GET_USER_CART(signedUser._id))
            }
            navigate('/')
        })
        .catch((error) => {
            console.log("login error ", error)
            dispatch(ADD_ERROR_TO_STORE(error.response.status, error.response.data))
        })
    }
}

export const LOGOUT_USER = (navigate) => {
    return (dispatch) => {
        const user = {
            _id: "",
            userName: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            mobile: null
        }
        dispatch(ADD_USER_TO_STORE(user))
        // dispatch(GET_USER_CART(user._id))
        dispatch(EMPTY_CART())
        navigate('/')
    }
}

export const GET_USER_BY_ID = (userid, setReviewUser) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/user/getuserbyid', {userid})
        .then(response => {
            console.log("getuserbyid", response)
            setReviewUser(response.data)
        })
        .catch(error => {
            console.log("error getting user by id", error)
        })
    }
}

export const SAVE_NOTIFICATION_TO_DB = (userid, notification) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/user/addnotification', {userid, notification})
        .then((res) => {
            console.log("notification saved ", res)
            // dispatch(ADD_NOTIFICATION_TO_STORE(res.data.notifications))
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export const REMOVE_NOTIFICATION = (userid, activity) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/user/removenotification', {userid, activity})
        .then((res => {
            console.log("notification removed", res)
        }))
        .catch(error => {
            console.log("remove notifcation error: ", error)
        })
    }
}