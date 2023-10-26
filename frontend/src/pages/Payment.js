import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CartSummary from '../components/CartSummary'

import '../styles/pages/Payment.scss'
import PaymentForm from '../components/PaymentForm'
import { ADD_ORDER_TO_STORE, CLEAR_ORDER_STORE, SAVE_ORDER_TO_DB, ADD_USERID_TO_STORE } from '../state/Order/orderAction'
import IsLoading from '../components/IsLoading'
import { EMPTY_CART, SAVE_CART_TO_DB } from '../state/Cart/cartAction'

const Payment = (props) => {
    const cartList = useSelector(state => state.cartReducer)
    const user = useSelector(state => state.userReducer.user)
    const currentOrder = useSelector(state => state.orderReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        const order = {
            nameOnCard: '',
            cardNumber: '',
            expiration: '',
            cvv: '',
            orderItems: cartList
        }
        dispatch(ADD_ORDER_TO_STORE(order))
        dispatch(ADD_USERID_TO_STORE(user._id))
    }, [])

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

    const completeOrder = () => {
        if (!currentOrder.order.nameOnCard || !currentOrder.order.cardNumber || !currentOrder.order.expiration || !currentOrder.order.cvv) {
            alert('please enter payment information')
        } else {
            dispatch(SAVE_ORDER_TO_DB(currentOrder.userid, currentOrder.order))

            setIsProcessing(true)

            
            setTimeout(() => {
                navigate('/ordersummary')
                
                setIsProcessing(false)
                
                dispatch(EMPTY_CART())
                if (user._id) {
                    dispatch(SAVE_CART_TO_DB([], user._id))
                }
            }, 2000)
        }
    }

    return (
        <motion.div
            className={!isProcessing ? 'payment paymentDefault' : 'payment paymentProcessing'}
            id="payment"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: {duration: 0.1} }}
        >
            {
                !isProcessing ?
                <>
                    <h1>payment</h1>
                    <div className='paymentBody'>
                        <div className='paymentInfo'>
                            <NavLink to="/cart" activeclassname="active" id="backToCart">&#8612; back to cart</NavLink>
                            <h3>shipping information</h3>
                            <p>name : {user.firstName} {user.lastName}</p>
                            <p>address: {user.address}</p>
                            <p>phone: {formatPhoneNumber(user.mobile)}</p>
                            <h3>payment information</h3>
                            <PaymentForm />
                        </div>
                        <div className='cartInfo'>
                            <h3 id="cartInfoHeader">order summary</h3>
                            <CartSummary data={recalculate(cartList)} readOnly={props.readOnly} />
                            <button onClick={completeOrder}>complete order</button>
                        </div>
                    </div>
                </>
                : 
                <div className='isLoading'>
                    <h2>processing order...</h2>
                    <IsLoading />
                </div>

            }
        </motion.div>
    )
}

export default Payment