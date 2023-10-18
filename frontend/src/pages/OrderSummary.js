import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import CartItem from '../components/CartItem'
import CartSummary from '../components/CartSummary'

import '../styles/pages/OrderSummary.scss'

const OrderSummary = (props) => {
    const order = useSelector(state => state.orderReducer)
    const allOrder = useSelector(state => state.orderReducer)
    const user = useSelector(state => state.userReducer.user)

    const recalculate = (cartItems)  => {
        let amount = 0
        let count = 0

        for (let item of cartItems) {
            amount += item.quantity * item.price
            count += item.quantity
        }

        return {
            amount,
            count
        }
    }

    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) {
            return phoneNumber
        }
        const phoneNumberLength = phoneNumber.length;
        const phoneNumberString = phoneNumber.toString()

        if (phoneNumberLength < 4) {
            return phoneNumber;
        } else if (phoneNumberLength < 7) {
            return `${phoneNumberString.slice(0, 3)}-${phoneNumberString.slice(3)}`;
        } else {
            return `${phoneNumberString.slice(0, 3)}-${phoneNumberString.slice(3, 6)}-${phoneNumberString.slice(6)}`;
        }
    }

    return (
        <div className='orderSummary'>
            <h1>order summary</h1>
            <h2>thank you for your order!</h2>
            <h3>order # {order._id}</h3>
            <p>your order is being processed. you will receive an email when your order has shipped.</p>
            <p>
                to check order status go to <span className='line'><NavLink to="/profile" activeclassname="active">profile &#8614;</NavLink></span>
            </p>
            <h3 id="shippingHeader">shipping information</h3>
                    <p>name : {user.firstName} {user.lastName}</p>
                    <p>address: {user.address}</p>
                    <p>phone: {formatPhoneNumber(user.mobile)}</p>
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>description</th>
                        <th>price</th>
                        <th>quantity</th>
                        <th>total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        order.order.orderItems.map(item => {
                            return <CartItem item={item} readOnly={props.readOnly} key={item._id} />
                        })
                    }
                </tbody>
            </table>
            <CartSummary data={recalculate(order.order.orderItems)} readOnly={props.readOnly} />
            <div className='navButtons'>

            </div>
        </div>
    )
}

export default OrderSummary