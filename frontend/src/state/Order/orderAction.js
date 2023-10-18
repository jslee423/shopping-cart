import * as actionTypes from '../actionTypes'
import axios from 'axios'

export const ADD_ORDER_TO_STORE = (order) => {
    return {
        type:  actionTypes.ADD_ORDER_TO_STORE,
        payload: order
    }
}

export const ADD_USERID_TO_STORE = (userid) => {
    return {
        type: actionTypes.ADD_USERID_TO_STORE,
        payload: userid
    }
}

export const ADD_ORDERID_TO_STORE = (orderid) => {
    return {
        type: actionTypes.ADD_ORDERID_TO_STORE,
        payload: orderid
    }
}

export const CLEAR_ORDER_STORE = (order) => {
    return {
        type: actionTypes.CLEAR_ORDER_STORE,
        payload: order
    }
}

export const ADD_RECENT_ORDERS_TO_STORE = (orders) => {
    return {
        type: actionTypes.ADD_RECENT_ORDERS_TO_STORE,
        payload: orders
    }
}

export const ADD_CANCELLED_ORDERS_TO_STORE = (orders) => {
    return {
        type: actionTypes.ADD_CANCELLED_ORDERS_TO_STORE,
        payload: orders
    }
}

export const SAVE_ORDER_TO_DB = (userid, order) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/order/saveuserorder',
            {userid, order}
        ).then((ServerData) => {
            dispatch(ADD_ORDER_TO_STORE(ServerData.data.order))
            dispatch(ADD_ORDERID_TO_STORE(ServerData.data._id))
        })
        .catch((error) => {
            console.log("Error while saving cart", error)
        })
    }
}

export const GET_USER_ORDERS = (userid, status) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/order/getuserorders', {userid, status})
        .then(data => {
            if (status === "PROCESSING") {
                dispatch(ADD_RECENT_ORDERS_TO_STORE(data.data))
            } else if (status === "CANCELLED") {
                dispatch(ADD_CANCELLED_ORDERS_TO_STORE(data.data))
            }
        })
        .catch(error => {
            console.log("error while getting orders", error)
        })
    }
}

export const CANCEL_ORDER = (userid, orderid, cancelDate) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/order/cancelorder', {userid, orderid, cancelDate})
        .then(data => {
            console.log(data)
            // dispatch(GET_USER_ORDERS(userid, "CANCELLED"))
        })
        .catch(error => {
            console.log("error while cancelling order", error)
        })
    }
}
