import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CartItem from '../components/CartItem'
import CartSummary from '../components/CartSummary'
import { EMPTY_CART, SAVE_CART_TO_DB } from '../state/Cart/cartAction'

import '../styles/pages/Cart.scss'

const Cart = (props) => {
    const cartList = useSelector(state => state.cartReducer)
    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (user._id) {
            dispatch(SAVE_CART_TO_DB(cartList, user._id))
        }
    }, [cartList])

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

    const checkout = (event)=>{
        navigate('/checkout');
        event.preventDefault();
    }

    return (
        <motion.div
            className='cart'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: {duration: 0.1} }}
        >
            <h1>shopping cart</h1>
            <div className='cartItemList'>
                {
                    cartList && cartList.length >= 1 ?
                    <>
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
                    {
                        props.readOnly ? <></> :
                        <div className='cartButtons'>
                            <button onClick={() => {dispatch(EMPTY_CART())}}>empty cart</button>
                            <button onClick={checkout}>checkout &#8614;</button>
                        </div>
                    }
                </>
                    : <h2>your cart is empty</h2>
                }
            </div>
        </motion.div>
    )
}

export default Cart