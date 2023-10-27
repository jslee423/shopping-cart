import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import starImg from '../images/star.png'
import userIcon from '../images/user.png'
import { ADD_ITEM_TO_CART, UPDATE_ITEM_IN_CART } from '../state/Cart/cartAction'

import '../styles/pages/ProductDetails.scss'

const ProductDetails = ({product}) => {
    // const {state} = useLocation()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cartReducer)
    const [newQuantity, setNewQuantity] = useState(1)
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
            dispatch(UPDATE_ITEM_IN_CART(cartItem._id, cartItem.quantity+Number(newQuantity)))
        } else {
            const newProduct = {
                ...product,
                quantity: Number(newQuantity)
            }
            dispatch(ADD_ITEM_TO_CART(newProduct))
        }
    }

    const quantityOnChange = (e) => {
        const value = e.target.value
        setNewQuantity(value)
    }

    return (
        <div className='productDetails'>
            <div className='breadcrumb'>
                <NavLink to="/" activeclassname="active">home</NavLink>
                <p className='bcDivider'>&gt;</p>
                <NavLink to="/products" activeclassname="active">products</NavLink>
                <p className='bcDivider'>&gt;</p>
                <p>{product.name}</p>
            </div>

            <div className='productInfoSection'>
                <div className='productInfo'>
                    <div className="productImage"></div>
                    <div className='prodDetails'>
                        <h1>{product.name}</h1>
                        <h3 id="prodRating">{avgRating}/5 <img src={starImg} alt="star icon" className="starImg" /> ({product.reviews.length})</h3>
                        <h3>{product.description}</h3>
                    </div>
                </div>
                <div className='addprodtocart'>
                    <div>
                        <h3>${(product.price * Number(newQuantity)).toFixed(2)}</h3>
                        <label htmlFor="addqty">qty: </label>
                        <input id='addqty' type="number" min={1} value={newQuantity} onChange={(e) => quantityOnChange(e)}></input>
                    </div>
                    <button id="addProductBtn" title="add to cart" onClick={() => addProductToCart(product)}>add to cart</button>
                </div>
            </div>

            <div className='customerReviews'>
                <h2>customer reviews</h2>
                {product.reviews.length >= 1 ?
                product.reviews.map((review, index) => {
                    return (
                        <div key={index} className="productReview">
                            <p className='reviewUser'><img src={userIcon} alt="user profile icon" className='userIcon' />{review.userName}</p>
                            <div className='reviewSection'>
                                <p className="userRating">{review.rating}/5 <img src={starImg} alt="star icon" className="starImg" /></p>
                                <h4 className='reviewHeadline'>{review.headline}</h4>
                            </div>
                            <p>{review.review}</p>
                        </div>
                    )
                })
                :
                <p id="noReviews">currently no customer reviews</p>
                }
            </div>
        </div>
    )
}

export default ProductDetails