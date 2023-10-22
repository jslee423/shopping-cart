import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../styles/components/CancelledOrders.scss'
import { ADD_ITEM_TO_CART, UPDATE_ITEM_IN_CART } from '../state/Cart/cartAction'
import { useNavigate } from 'react-router-dom'

const CancelledOrders = ({ orders }) => {
    const currentCart = useSelector(state => state.cartReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formatDate = (date) => {
        const formatted = new Date(date)
        return formatted.toUTCString()
    }

    const reorder = (orderItems) => {
        console.log("reorder", orderItems)
        for (const item of orderItems) {
            const cartItem = currentCart.find(itemInCart => itemInCart._id === item._id)
            if (cartItem) {
                console.log("item in cart")
                dispatch(UPDATE_ITEM_IN_CART(cartItem._id, cartItem.quantity + item.quantity))
            } else {
                console.log("item not in cart")
                dispatch(ADD_ITEM_TO_CART(item))
            }
        }
    }

    const orderDetails = (order) => {
        navigate('/orderdetails', {state: order})
    }

    return (
        <table id="cancelledOrderTable">
            <thead>
                <tr>
                    <th>order #</th>
                    <th># of items</th>
                    <th>order date</th>
                    <th>cancel date</th>
                </tr>
            </thead>
            <tbody>
                {orders.canceledOrders.map((order) => {
                    return (
                        <tr key={order._id}>
                            <td onClick={() => orderDetails(order)} title="see order details">{order._id}</td>
                            <td onClick={() => orderDetails(order)} title="see order details">{order.order.orderItems.length}</td>
                            <td onClick={() => orderDetails(order)} title="see order details">{formatDate(order.dateTime)}</td>
                            <td onClick={() => orderDetails(order)} title="see order details">{formatDate(order.cancelDate)}</td>
                            <td><button id='reorder' onClick={() => reorder(order.order.orderItems)}>reorder</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default CancelledOrders