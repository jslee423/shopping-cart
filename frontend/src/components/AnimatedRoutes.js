import React from 'react'
import { useLocation, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from "../pages/Home"
import Cart from "../pages/Cart"
import SignUp from "../pages/SignUp"
import About from "../pages/About"
import Checkout from "../pages/Checkout"
import Payment from "../pages/Payment"
import Profile from "../pages/Profile"
import Products from "../pages/Products"
import Login from "../pages/Login"
import OrderSummary from '../pages/OrderSummary'

const AnimatedRoutes = () => {
    const location = useLocation()

    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/ordersummary" element={<OrderSummary />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes