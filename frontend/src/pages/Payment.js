import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import CartSummary from '../components/CartSummary'

import '../styles/pages/Payment.scss'
import PaymentForm from '../components/PaymentForm'

const Payment = (props) => {
    const cartList = useSelector(state => state.cartReducer)
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

    const handlePhoneNumberChange = (event) => {
        const inputPhoneNumber = event.target.value.replace(/\D/g, '');
        const formattedPhoneNumber = formatPhoneNumber(inputPhoneNumber);
        setMobileFormatted(formattedPhoneNumber);
        setMobile(inputPhoneNumber)
    };

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

    const completeOrder = () => {}

    return (
        <motion.div
            className='payment'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: {duration: 0.1} }}
        >
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
        </motion.div>
    )
}

export default Payment