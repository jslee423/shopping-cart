import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import '../styles/pages/ProductDetails.scss'

const ProductDetails = ({product}) => {
    // const {state} = useLocation()
    return (
        <div className='productDetails'>
            <div className='breadcrumb'>
                <NavLink to="/" activeclassname="active">home</NavLink>
                <p className='bcDivider'>&gt;</p>
                <NavLink to="/products" activeclassname="active">products</NavLink>
                <p className='bcDivider'>&gt;</p>
                <p>{product.name}</p>
            </div>
            {/* <h1>product details</h1> */}
            <h1>{product.name}</h1>
            <h3>{product.description}</h3>
            <h3>${product.price.toFixed(2)}</h3>
            <h3>{product.rating}</h3>

            <div className='customerReviews'>
                <h2>customer reviews</h2>
            </div>
        </div>
    )
}

export default ProductDetails