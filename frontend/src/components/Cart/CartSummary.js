import React from 'react'
import './CartSummary.scss'

const CartSummary = (props) => {
    const {count, amount} = props.data
    return (
        <div className='cartsummary'>
            {/* {props.readOnly ? <h5>Summary</h5> : <h2>Summary</h2>} */}
            {/* <h3>Summary</h3> */}
            <h3>subtotal ({count} items): ${amount.toFixed(2)}</h3>
            {/* <p>Product count: {count}</p> */}
        </div>
    )
}

export default CartSummary