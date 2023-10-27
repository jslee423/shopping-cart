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
            console.log("get products form db res: ", res)
            const allProducts = res.data
            dispatch(ADD_PRODUCT_TO_STORE(allProducts))
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export const SAVE_REVIEW_TO_DB = (product_id, review) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/product/addreview', {product_id, review})
        .then((res) => {
            console.log("review saved ", res)
            // dispatch(GET_REVIEWS(product_id))
            dispatch(GET_PRODUCTS_FROM_DB())
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export const GET_PRODUCT_BY_ID = (product_id) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/product/getproductbyid', {product_id})
        .then((res) => {
            console.log("get prod by id res: ", res)
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export const ADD_REVIEW_TO_STORE = (review) => {
    console.log("adding review to store: ", review)
    return {
        type: actionTypes.ADD_REVIEW_TO_STORE,
        payload: review
    }
}

export const GET_USER_REVIEW = (product_id, userid) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/product/getuserreview', {product_id, userid})
        .then((res) => {
            console.log("get prod by id res: ", res)
            dispatch(ADD_REVIEW_TO_STORE(res.data.reviews))
        })
        .catch(error => {
            console.log("error", error)
        })
    }
}

export const GET_REVIEWS = (product_id) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/product/getreviews', {product_id})
        .then((res) => {
            console.log("get prod reviews res: ", res)
            dispatch(ADD_REVIEW_TO_STORE(res.data.reviews))
        })
        .catch(error => {
            console.log("error", error)
        })
    }
}