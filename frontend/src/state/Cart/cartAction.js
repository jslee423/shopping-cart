import * as actionTypes from '../actionTypes'
import axios from 'axios'

export const ADD_ITEM_TO_CART = (item) => {
    return {
        type: actionTypes.ADD_ITEM_TO_CART,
        payload: {item}
    }
}

export const REMOVE_ITEM_FROM_CART = (id) => {
    return {
        type: actionTypes.REMOVE_ITEM_FROM_CART,
        payload: {id}
    }
}

export const UPDATE_ITEM_IN_CART = (id, quantity) => {
    return {
        type: actionTypes.UPDATE_ITEM_IN_CART,
        payload: {
            id,
            quantity: parseInt(quantity)
        }
    }
}

export const EMPTY_CART = (item) => {
    console.log("empty cart item", item)
    return {
        type: actionTypes.EMPTY_CART,
        payload: {item}
    }
}

export const SAVE_CART_TO_DB = (cart, userid) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/cart/saveusercart',
            {userid, cart}
        ).then((ServerData) => {
            console.log("SAVE_CART_TO_DB response", ServerData.data.cart)
        })
        .catch((error) => {
            console.log("Error while saving cart", error)
        })
    }
}

export const GET_USER_CART = (userid) => {
    return (dispatch) => {
        axios.post("http://localhost:9000/cart/getusercart",
            {userid}
        )
        .then((response) => {
            dispatch(EMPTY_CART())

            for (const item of response.data.cart) {
                let action = ADD_ITEM_TO_CART(item)
                dispatch(action)
            }
        })
        .catch(error => {
            console.log("error while login", error)
        })
    }
}