import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProductForm from '../../components/Product/ProductForm'
import { GET_PRODUCTS_FROM_DB } from '../../state/Products/productAction'
import ProductItem from '../../components/Product/ProductItem'
import './Products.scss'
import ProductGrid from '../../components/Product/ProductGrid'

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