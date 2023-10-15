import * as actionTypes from '../actionTypes';

const initialState = {
    user: {
        _id: "",
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        mobile: null
    }
}

let userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER_TO_STORE:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default userReducer;