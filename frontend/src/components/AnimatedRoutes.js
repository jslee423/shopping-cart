import React, { lazy } from 'react'
import { useLocation, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
const Home = lazy(() => import("../pages/Home"))
const Cart = lazy(() => import("../pages/Cart"))
const SignUp = lazy(() => import("../pages/SignUp"))
const About = lazy(() => import("../pages/About"))
const Checkout = lazy(() => import("../pages/Checkout"))
const Payment = lazy(() => import("../pages/Payment"))
const Profile = lazy(() => import("../pages/Profile"))
const Products = lazy(() => import("../pages/Products"))
const Login = lazy(() => import("../pages/Login"))
const OrderSummary = lazy(() => import('../pages/OrderSummary'))

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