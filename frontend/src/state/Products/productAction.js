import * as actionTypes from '../actionTypes'
import axios from 'axios'
import { ADD_ERROR_TO_STORE } from '../Errors/errorAction'

export const ADD_PRODUCT_TO_STORE = (products) => {
    return {
        type: actionTypes.ADD_PRODUCT_TO_STORE,
        payload: {products}
    }
}

export const SAVE_PRODUCT_TO_DB = (product) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/product/addproduct', product)
        .then((ServerData) => {
            let addProduct = ServerData.data
            dispatch(ADD_PRODUCT_TO_STORE(addProduct))
            dispatch(ADD_ERROR_TO_STORE(202, 'product successfully added'))
            dispatch(GET_PRODUCTS_FROM_DB())
        })
        .catch((error) => {
            console.log(error)
            dispatch(ADD_ERROR_TO_STORE(error.response.status, error.response.data))
        })
    }
}

export const GET_PRODUCTS_FROM_DB = () => {
    return (dispatch) => {
        axios.get('http://localhost:9000/product/getproducts')
        .then((res) => {
            const allProducts = res.data
            dispatch(ADD_PRODUCT_TO_STORE(allProducts))
        })
        .catch((error) => {
            console.log(error)
        })
    }
}