import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GET_USER_ORDERS } from '../state/Order/orderAction'
import RecentOrders from '../components/RecentOrders'
import CancelledOrders from '../components/CancelledOrders'
import OrderDetails from '../components/OrderDetails'

import '../styles/pages/Profile.scss'

const Profile = () => {
    const user = useSelector(state => state.userReducer.user)
    const orders = useSelector(state => state.orderReducer)
    const [selectedOrder, setSelectedOrder] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showDetails, setShowDetails] = useState(false)

    useEffect(() => {
        if (!user._id) {
            console.log('not logged in')
            navigate('/')
        } else {
            dispatch(GET_USER_ORDERS(user._id, "PROCESSING"))
            dispatch(GET_USER_ORDERS(user._id, "CANCELLED"))
        }
    }, [])

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
            {showDetails ?
            <OrderDetails order={selectedOrder} setShowDetails={setShowDetails} />
            :
            <>
                <h2>recent orders</h2>
                <div className='recentOrders'>
                    {orders.recentOrders && orders.recentOrders.length >= 1 ?
                    <RecentOrders orders={orders} setOrder={setSelectedOrder} setShowDetails={setShowDetails} />
                    : <p>you have not made any orders</p>
                    }
                </div>

                <h2>completed orders</h2>
                <div className='completedOrders'></div>
                
                <h2>cancelled orders</h2>
                <div className='cancelledOrders'>
                    {orders.canceledOrders && orders.canceledOrders.length >= 1 ?
                    <CancelledOrders orders={orders} setOrder={setSelectedOrder} setShowDetails={setShowDetails} />
                    : <p>you have not cancelled any orders</p>
                    }
                </div>
            </>
            }
        </motion.div>
    )
}

export default Profile