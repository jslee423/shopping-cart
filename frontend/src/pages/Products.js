import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProductForm from '../components/ProductForm'
import ProductGrid from '../components/ProductGrid'
import { motion } from 'framer-motion'

import '../styles/pages/Products.scss'

const Products = () => {
    const user = useSelector(state => state.userReducer.user)
    const products = useSelector(state => state.productReducer.products)
    const error = useSelector(state => state.errorReducer)
    const dispatch = useDispatch()

    return (
        <motion.div
            className='products'
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0, transition: {duration: 0.1} }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ width: window.innerWidth, transition: {duration: 0.1} }}
        >
            {user.userName === "admin" && <ProductForm />}
            <h1>products</h1>
            <ProductGrid />
        </motion.div>
    )
}

export default Products