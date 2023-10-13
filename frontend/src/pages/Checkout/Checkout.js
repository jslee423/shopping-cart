import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CartItem from '../../components/Cart/CartItem'
import CartSummary from '../../components/Cart/CartSummary'

import './Checkout.scss'

const Checkout = () => {
    return (
        <div className='checkout'>
            <h1>checkout</h1>
        </div>
    )
}

export default Checkout