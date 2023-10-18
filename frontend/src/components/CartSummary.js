import React from 'react'
import { useLocation } from 'react-router-dom'

import '../styles/components/CartSummary.scss'

const CartSummary = (props) => {
    const {count, amount} = props.data
    const tax = 1.06
    const shipping = 5.00
    const total = amount * tax + shipping
    const location = useLocation()

    return (
        <div className={location.pathname === '/cart' ? 'cartsummary' : 'checkoutsummary'}>
            <h4>subtotal ({count} items): ${amount.toFixed(2)}</h4>
            {location.pathname != '/cart' ?
            <>
                <h4>tax: ${(amount * .06).toFixed(2)}</h4>
                <h4>shipping: $5.00</h4>
                <h3>total: ${total.toFixed(2)}</h3>
            </>
            : null}
        </div>
    )
}

export default CartSummary