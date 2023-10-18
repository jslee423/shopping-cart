import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import CartItem from '../components/CartItem'
import CartSummary from '../components/CartSummary'
import CheckoutUserForm from '../components/CheckoutUserForm'

import '../styles/pages/Checkout.scss'

const Checkout = (props) => {
    const user = useSelector(state => state.userReducer.user)
    const cartList = useSelector(state => state.cartReducer)
    const navigate = useNavigate()
    const [updateForm, setUpdateForm] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (cartList.length === 0) {
            console.log('cart empty')
            navigate('/cart')
        } else {
            console.log('cart not empty')
        }
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
        if (phoneNumberLength < 4) {
            return phoneNumber;
        } else if (phoneNumberLength < 7) {
            return `${phoneNumber.toString().slice(0, 3)}-${phoneNumber.toString().slice(3)}`;
        } else {
            return `${phoneNumber.toString().slice(0, 3)}-${phoneNumber.toString().slice(3, 6)}-${phoneNumber.toString().slice(6)}`;
        }
    }

    const proceedToPayment = () => {
        if (!user.firstName || !user.lastName || !user.address || !user.mobile) {
            setError('please enter shipping information')
        } else {
            navigate('/payment')
        }
    }

    const updateInfo = () => {
        setUpdateForm(true)
        setError('')
    }

    return (
        <motion.div
            className='checkout'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: {duration: 0.1} }}    
        >
            <h1>checkout</h1>
            {
                cartList && cartList.length >= 1 ?
                <>
                    {/* <button onClick={goTo} className='backToCart'>&#8612; back to cart</button> */}
                    <NavLink to="/cart" activeclassname="active" className='backToCart'>&#8612; back to cart</NavLink>
                    <div className='userInfo'>
                        <h3>shipping information</h3>
                        {!user._id && 
                        <p>
                            have an account? <span className='line'><NavLink to="/login" activeclassname="active">login</NavLink></span>
                        </p>}
                        {updateForm 
                        ? 
                        <>
                            <CheckoutUserForm updateFormFunc={setUpdateForm} /> 
                            <button onClick={() => setUpdateForm(false)} id="cancelUpdate">&#8612; cancel</button>
                        </>
                        :
                        <>
                            <button onClick={() => updateInfo()} id='updateInfoBtn'>update info &#8614;</button>
                            <p>name : {user.firstName} {user.lastName}</p>
                            <p>address: {user.address}</p>
                            {/* <p>phone: {user.mobile}</p> */}
                            <p>phone: {formatPhoneNumber(user.mobile)}</p>
                        </>}
                    </div>
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
                                cartList.map(item => {
                                    return <CartItem item={item} readOnly={props.readOnly} key={item._id} />
                                })
                            }
                        </tbody>
                    </table>
                    <CartSummary data={recalculate(cartList)} readOnly={props.readOnly} />
                    <p className="errorMessage" aria-live="assertive" style={!error ? {display: 'none'} : {display: 'block'}}>{error}</p>
                    <button onClick={() => proceedToPayment()} className='paymentBtn'>proceed to payment &#8614;</button>
                </>
                : null
            }
        </motion.div>
    )
}

export default Checkout