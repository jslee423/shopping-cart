import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GET_USER_ORDERS } from '../state/Order/orderAction'

import '../styles/pages/Profile.scss'

const Profile = () => {
    const user = useSelector(state => state.userReducer.user)
    const orders = useSelector(state => state.orderReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user._id) {
            console.log('not logged in')
            navigate('/')
        } else {
            dispatch(GET_USER_ORDERS(user._id, "PROCESSING"))
            dispatch(GET_USER_ORDERS(user._id, "CANCELLED"))
        }
    }, [])

    const checkOrderDate = (order) => {
        const currentDate = new Date()

        // orderDate is ISO 8601 date string
        const jsOrderDate = new Date(order.dateTime); // Convert ISO string to a JavaScript Date object
        const diffBetween = currentDate - jsOrderDate
        const diffInDays = diffBetween / (1000 * 3600 * 24)

        if (diffInDays < 2) {
            return <button id='cancelOrder' onClick={cancelOrder(order._id)}>cancel order</button>
        } else {
            return

        }
    }

    const cancelOrder = (orderId) => {
        
    }

    return (
        <motion.div 
            className='profile'
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0, transition: {duration: 0.1} }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ width: window.innerWidth, transition: {duration: 0.1} }}
        >
            <h1>profile</h1>
            <h2>recent orders</h2>
            <div className='recentOrders'>
                {orders.recentOrders && orders.recentOrders.length >= 1 ?
                <table>
                    <thead>
                        <tr>
                            <th>order #</th>
                            <th>date</th>
                            <th># of items</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.recentOrders.map((order) => {
                            return (
                            <tr>
                                <td>{order._id}</td>
                                <td>{order.dateTime}</td>
                                <td>{order.order.orderItems.length}</td>
                                <td>{order.status}</td>
                                <td>{checkOrderDate(order)}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                : <p>you have not made any orders</p>
                }
            </div>
            
            <h2>cancelled orders</h2>
            <div className='cancelledOrders'>
                {orders.canceledOrders && orders.canceledOrders.length >= 1 ?
                orders.canceledOrders.map((order) => {
                        return<p>order #: {order._id}</p>
                })
                : <p>you have not cancelled any orders</p>
                }
            </div>
        </motion.div>
    )
}

export default Profile