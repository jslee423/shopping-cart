import * as actionTypes from '../actionTypes';

const initialState = {
    status: null,
    message: null
}

let errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ERROR_TO_STORE:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message
            }
        default:
            return state
    }
}

export default errorReducer;