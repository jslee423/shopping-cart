import * as actionTypes from '../actionTypes'

const initialState = {
    _id: '',
    userid: '',
    order: {
        cardInfo: {
            nameOnCard: '',
            cardNumber: '',
            expiration: '',
            cvv: ''
        },
        orderItems: []
    },
    cancelDate: '',
    recentOrders: [],
    canceledOrders: []
}

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_ORDER_TO_STORE:
            return {
                ...state,
                order: action.payload
            }
        case actionTypes.ADD_USERID_TO_STORE:
            return {
                ...state,
                userid: action.payload
            }
        case actionTypes.ADD_ORDERID_TO_STORE:
            return {
                ...state,
                _id: action.payload
            }
        case actionTypes.ADD_RECENT_ORDERS_TO_STORE:
            return {
                ...state,
                recentOrders: action.payload
            }
        case actionTypes.ADD_CANCELLED_ORDERS_TO_STORE:
            return {
                ...state,
                canceledOrders: action.payload
            }
        default:
            return state
    }
}

export default orderReducer