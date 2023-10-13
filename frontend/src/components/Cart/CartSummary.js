import React from 'react'

import './CartSummary.scss'

const CartSummary = (props) => {
    const {count, amount} = props.data
    return (
        <div className='cartsummary'>
            <h3>subtotal ({count} items): ${amount.toFixed(2)}</h3>
        </div>
    )
}

export default CartSummary