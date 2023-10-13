import React, { useEffect } from 'react'
import ProductItem from './ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { GET_PRODUCTS_FROM_DB } from '../../state/Products/productAction'
import './ProductGrid.scss'

const ProductGrid = () => {
    const products = useSelector(state => state.productReducer.products)
    const dispatch = useDispatch()

    useEffect(() => {
        products && products.length == 0 
            ? dispatch(GET_PRODUCTS_FROM_DB()) 
            : ""
    }, [])

    return (
        <div className='productGrid'>
            {products && products.length >= 1 
                ? products.map((product) => {
                    return <ProductItem product={product} key={product._id} />
                }) 
                : <h2>No products to show</h2>}
        </div>
    )
}

export default ProductGrid