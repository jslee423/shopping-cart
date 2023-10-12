import * as actionTypes from '../actionTypes'
// import axios from 'axios'

export const ADD_ERROR_TO_STORE = (status, message) => {
    return {
        type:  actionTypes.ADD_ERROR_TO_STORE,
        payload: {status: status, message: message}
    }
}