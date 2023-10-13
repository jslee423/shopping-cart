import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProductForm from '../../components/Product/ProductForm'
import ProductGrid from '../../components/Product/ProductGrid'

import './Products.scss'

const Products = () => {
    const user = useSelector(state => state.userReducer.user)
    const products = useSelector(state => state.productReducer.products)
    const error = useSelector(state => state.errorReducer)
    const dispatch = useDispatch()

    return (
        <div className='products'>
            {user.userName === "admin" && <ProductForm />}
            <h1>products</h1>
            <ProductGrid />
        </div>
    )
}

export default Products