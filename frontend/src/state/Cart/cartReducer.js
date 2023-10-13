import * as actionTypes from '../actionTypes'

const initialState = []

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_ITEM_TO_CART:
            let newState = state.filter(item => item._id != action.payload.item._id)
            return [...newState, action.payload.item]
        case actionTypes.REMOVE_ITEM_FROM_CART:
            return state.filter(item => item._id != action.payload.id)
        case actionTypes.UPDATE_ITEM_IN_CART:
            return state.map((item)=>{
                if (item._id == action.payload.id) { //update the qty of item we want to update with selected id
                    return {...item, quantity:action.payload.quantity} //...item means {name, desc, rating, qty, price}
                }
                return item;//for all other items in cart do not update anything
            })
        case actionTypes.EMPTY_CART:
            return []
        default:
            return state
    }
}

export default cartReducer