import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_ITEM_TO_CART, UPDATE_ITEM_IN_CART } from '../state/Cart/cartAction'

import '../styles/components/ProductItem.scss'

const ProductItem = ({product}) => {
    const cart = useSelector(state => state.cartReducer)
    const dispatch = useDispatch()

    const addProductToCart = (product) => {
        const cartItem = cart.find(item => item._id === product._id)
        if (cartItem) {
            dispatch(UPDATE_ITEM_IN_CART(cartItem._id, cartItem.quantity+1))
        } else {
            dispatch(ADD_ITEM_TO_CART(product))
        }
    }

    return (
        <div className='productItem'>
            <a className="productItem__image" href="#"></a>
            <div className='productItem__name'>
                <h3>{product.name}</h3>
            </div>
            <div className='productItem__price'>
                <p>${product.price.toFixed(2)}</p>
            </div>
            <button id="addProductBtn" title="add to cart" onClick={() => addProductToCart(product)}>+</button>
        </div>
    )
}

export default ProductItem