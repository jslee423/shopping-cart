import React, { useEffect, useRef, useState } from 'react'
import notificationImg from '../images/bell.png'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { UPDATE_ITEM_IN_CART, ADD_ITEM_TO_CART } from '../state/Cart/cartAction'

import '../styles/components/Notifications.scss'
import { REMOVE_NOTIFICATION } from '../state/User/userAction'

const Notifications = () => {
    // const [showNotifications, setShowNotifications] = useState(false)
    const notificationRef = useRef()
    const cartList = useSelector(state => state.cartReducer)
    const user = useSelector(state => state.userReducer.user)
    const products = useSelector(state => state.productReducer.products)
    const navigate = useNavigate()
    const location = useLocation()
    const [currentViewProd, setCurrentViewProd] = useState('')
    const dispatch = useDispatch()

    console.log("userNotif", user.notifications)

    useEffect(() => {
        if (location.pathname.split('/')[1] === "products" && location.pathname.split('/').length > 2) {
            const currentProd = products.filter(product => product._id === location.pathname.split('/')[2])
            setCurrentViewProd(currentProd[0])
        }
    }, [])

    const openNotifications = () => {
        notificationRef.current.style.width = "25rem";
    }

    const closeNotifications = () => {
        notificationRef.current.style.width = "0";
    }

    const addItemToCart = (product) => {
        const cartItem = cartList.find(item => item._id === product._id)
        if (cartItem) {
            dispatch(UPDATE_ITEM_IN_CART(cartItem._id, cartItem.quantity+1))
        } else {
            dispatch(ADD_ITEM_TO_CART(product))
        }
    }

    const recalculate = (cartItems)  => {
        let count = 0

        for (let item of cartItems) {
            count += item.quantity
        }

        return count
    }

    const removeNotification = (activity) => {
        dispatch(REMOVE_NOTIFICATION(user._id, activity))
    }

    return (
        <>
        <button id="notifButton" onClick={() => openNotifications()}><img src={notificationImg} alt='notifications icon' /><span id="notifCount">{user.notifications?.length}</span></button>

        <div id="mySidenav" className="notificationList" ref={notificationRef}>
            <button className="closebtn" onClick={() => closeNotifications()}>&times;</button>
            <h2>notifications</h2>
            <p id="cartCount">current items in cart: {recalculate(cartList)}</p>
            {cartList.length >= 1 && <button className="notifButton" id="checkout" onClick={() => navigate('/checkout')}>checkout</button>}
            {location.pathname.split('/')[1] === "products" && location.pathname.split('/').length > 2 ?
            <button className="notifButton" onClick={() => addItemToCart(currentViewProd)}>add item cart</button>
            :
            null
            }
            <h3>recent activity</h3>
            {user.notifications && user.notifications.length >= 1 ?
            user.notifications.map((notification, index) => {
                return (
                    <div className='activitySection' key={index} onClick={() => {removeNotification(notification.activity)}}>
                        <p className='activityDate'>date: {notification.date}</p>
                        <p className='activity'>{notification.activity}</p>
                    </div>

                )
            })
            :
            <p className='activity'>no recent activity</p>
            }
        </div>
        </>
    )
}

export default Notifications