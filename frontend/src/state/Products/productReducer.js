import * as actionTypes from '../actionTypes';

const initialState = {
    defaultProduct: {
        name: "product name",
        price: 0.00,
        description: "product description",
        rating: 0,
    },
    reviews: [],
    products: []
}

let productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT_TO_STORE:
            return {
                ...state,
                products: action.payload.products
            }
        case actionTypes.ADD_REVIEW_TO_STORE:
            return {
                ...state,
                reviews: action.payload
            }
        default:
            return state
    }
}

export default productReducer;