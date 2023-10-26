import React, { useEffect, useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import reviewImg from '../images/comment.png'

import '../styles/components/OrderDetails.scss'
import ProductReviewPopup from './ProductReviewPopup'

const OrderDetails = ({ order, setShowDetails }) => {
    // const {state} = useLocation()
    const tax = .06
    const shipping = 5.00
    const [amount, setAmount] = useState(0)
    const [count, setCount] = useState(0)
    const [total, setTotal] = useState(0)
    const [showReview, setShowReview] = useState(false)
    const [prodForReview, setProdForReview] = useState('')
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = (item) => {
        setIsOpen(!isOpen);
        setProdForReview(item)
    };

    const recalculate = (cartItems)  => {
        let amount = 0
        let cnt = 0

        for (let item of cartItems) {
            amount += item.quantity * item.price
            cnt += item.quantity
        }

        setAmount(amount)
        setCount(cnt)
        setTotal(amount * (tax + 1) + shipping)
    }

    const checkOrderDate = (order) => {
        const currentDate = new Date()

        // orderDate is ISO 8601 date string
        const jsOrderDate = new Date(order.dateTime); // Convert ISO string to a JavaScript Date object
        const diffBetween = currentDate - jsOrderDate
        const diffInDays = diffBetween / (1000 * 3600 * 24)

        if (diffInDays < 2 || order.status === "CANCELLED") {
            setShowReview(false)
        } else {
            setShowReview(true)

        }
    }

    useEffect(() => {
        recalculate(order.order.orderItems)
        checkOrderDate(order)
    }, [])

    return (
        <motion.div
            className='orderDetails'
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0, transition: {duration: 0.1} }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ width: window.innerWidth, transition: {duration: 0.1} }}
        >
            <button id="backToProfile" onClick={() => setShowDetails(false)}>&#8612; back to profile</button>
            <h1>order details for</h1>
            <h2>order #: {order._id}</h2>
            <h3>status: {order.status}</h3>
            <h3>items purchased:</h3>
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>description</th>
                        <th>price</th>
                        <th>quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {order.order.orderItems.map((item) => {
                        return (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            {showReview &&
                            <td><button id="reviewBtn" title="add review" onClick={() => togglePopup(item)}><img src={reviewImg} alt="" /></button></td>
                            }
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='orderSummary'>
                <h4>subtotal ({count} items): ${amount}</h4>
                <h4>tax: ${(amount * .06).toFixed(2)}</h4>
                <h4>shipping: ${shipping.toFixed(2)}</h4>
                <h3>total: ${total.toFixed(2)}</h3>
            </div>
            {isOpen && (
                <ProductReviewPopup toggle={togglePopup} product={prodForReview} />
            )}
        </motion.div>
    )
}

export default OrderDetails