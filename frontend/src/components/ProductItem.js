import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_ITEM_TO_CART, UPDATE_ITEM_IN_CART } from '../state/Cart/cartAction'
import { NavLink, useNavigate } from 'react-router-dom'
import starImg from '../images/star.png'

import '../styles/components/ProductItem.scss'

const ProductItem = ({product}) => {
    const cart = useSelector(state => state.cartReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [avgRating, setAvgRating] = useState(0)

    useEffect(() => {
        // const initialValue = 0;
        if (product.reviews && product.reviews.length >= 1) {
            const sumOfRatings = product.reviews.reduce((accumulator, currentValue) => accumulator + Number(currentValue.rating), 0)
            setAvgRating(sumOfRatings/product.reviews.length)
        }
    })

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
            {/* <a className="productItem__image" href=""></a> */}
            <NavLink to={`/products/${product._id}`} activeclassname="active" className="productItem__image"></NavLink>
            <div className='productItem__name'>
                <h3 onClick={() => navigate(`/products/${product._id}`)}>{product.name}</h3>
            </div>
            <div className='productItem__price'>
                <p onClick={() => navigate(`/products/${product._id}`)}>${product.price.toFixed(2)}</p>
            </div>
            <p id="prodRating">{avgRating}/5 <img src={starImg} alt="star icon" id="starImg" /> ({product.reviews.length})</p>
            <button id="addProductBtn" title="add to cart" onClick={() => addProductToCart(product)}>+</button>
        </div>
    )
}

export default ProductItem