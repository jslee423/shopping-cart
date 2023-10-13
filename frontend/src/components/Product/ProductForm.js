import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SAVE_PRODUCT_TO_DB } from '../../state/Products/productAction'
import { ADD_ERROR_TO_STORE } from '../../state/Errors/errorAction'

import './ProductForm.scss'

const ProductForm = () => {
    const dispatch = useDispatch()
    const error = useSelector(state => state.errorReducer)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState(null)

    useEffect(() => {
        dispatch(ADD_ERROR_TO_STORE(null, ''))
    }, [name, price, description, rating])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const product = {
            name: name,
            price: price,
            description: description,
            rating: rating
        }

        dispatch(SAVE_PRODUCT_TO_DB(product))
    }

    const resetInputs = (e) => {
        const id = e.target.id
        if (error.status === 202) {
            setName('')
            setPrice('')
            setDescription('')
        } else if (id === "name" && error.status === 401) {
            setName('')
        } else if (id === "price" && error.status === 401) {
            setPrice('')
        } else if (id === "description" && error.status === 401) {
            setDescription('')
        }
        
    }

    return (
        <div id='productForm'>
            <h4>add new product</h4>
            <p className={error.status === 401 ? "errorMessage": "successMessage"} aria-live="assertive">{error.message}</p>
            <form onSubmit={handleSubmit}>
                <section className='prodFormSection'>
                    <label htmlFor="name">name</label>
                    <input
                        type="text"
                        id="name"
                        autoComplete='off'
                        onChange={(e) => setName(e.target.value)}
                        onClick={resetInputs}
                        value={name}
                        placeholder='product name'
                        required
                    />
                </section>
                <section className='prodFormSection'>
                    <label htmlFor="price">price</label>
                    <input
                        type="text"
                        id="price"
                        onChange={(e) => setPrice(e.target.value)}
                        onClick={resetInputs}
                        value={price}
                        placeholder='100.00'
                        required
                    />
                </section>
                <section className='prodFormSection'>
                    <label htmlFor="description">description</label>
                    <input
                        type="text"
                        id="description"
                        autoComplete='off'
                        onChange={(e) => setDescription(e.target.value)}
                        onClick={resetInputs}
                        value={description}
                        placeholder='description'
                        required
                    />
                </section>
                <section className='prodFormSection'>
                    <label htmlFor="rating">rating</label>
                    <select name="rating" id="rating" onChange={(e) => setRating(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </section>
                <button>+</button>
            </form>
        </div>
    )
}

export default ProductForm