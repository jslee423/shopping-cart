import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CANCEL_ORDER, GET_USER_ORDERS } from '../state/Order/orderAction'
import { UPDATE_ITEM_IN_CART, ADD_ITEM_TO_CART } from '../state/Cart/cartAction'

import '../styles/components/RecentOrders.scss'

const RecentOrders = ({ orders }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer.user)

    useEffect(() => {
        console.log('effect')
    }, [orders.recentOrders, orders.canceledOrders])

    const checkOrderDate = (order) => {
        const currentDate = new Date()

        // orderDate is ISO 8601 date string
        const jsOrderDate = new Date(order.dateTime); // Convert ISO string to a JavaScript Date object
        const diffBetween = currentDate - jsOrderDate
        const diffInDays = diffBetween / (1000 * 3600 * 24)

        if (diffInDays < 2) {
            return <button id='cancelOrder' onClick={() => cancelOrder(user._id, order._id)}>cancel order</button>
        } else {
            return

        }
    }
    
    const formatDate = (date) => {
        const formatted = new Date(date)
        return formatted.toUTCString()
    }

    const cancelOrder = (userid, orderid) => {
        const cancelDate = new Date()
        dispatch(CANCEL_ORDER(userid, orderid, cancelDate))
        dispatch(GET_USER_ORDERS(userid, "PROCESSING"))
        dispatch(GET_USER_ORDERS(userid, "CANCELLED"))
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

    return (
        <table id="recentOrderTable">
            <thead>
                <tr>
                    <th>order #</th>
                    <th># of items</th>
                    <th>date</th>
                    <th>status</th>
                </tr>
            </thead>
            <tbody>
                {orders.recentOrders.map((order) => {
                    return (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.order.orderItems.length}</td>
                        <td>{formatDate(order.dateTime)}</td>
                        <td>{order.status}</td>
                        <td>{checkOrderDate(order)}</td>
                        <td><button id='reorder' onClick={() => reorder(order.order.orderItems)}>reorder</button></td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default RecentOrders