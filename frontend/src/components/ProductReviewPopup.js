import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../styles/components/ProductReviewPopup.scss'
import { SAVE_REVIEW_TO_DB } from '../state/Products/productAction'

const ProductReviewPopup = (props) => {
    const {toggle, product} = props
    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer.user)
    const [rating, setRating] = useState('')
    const [headline, setHeadline] = useState('')
    const [review, setReview] = useState('')

    const addReview = () => {
        e.preventDefault()
        
        const review = {
            userid: user._id,
            orderid: product._id,
            rating: rating,
            headline: headline,
            review: review
        }

        // dispatch(SAVE_REVIEW_TO_DB(product._id, review))
        console.log("userid: " + user._id + " orderid: " + product._id + " rating: " + rating + " headline: " + headline + " review: " + review)
    }

    return (
        <div className="reviewPopup">
            <div className="popup-content">
                <span className="close" onClick={toggle}>&times;</span>
                <h2>add product review</h2>
                <h3>{product.name}</h3>
                <h3>{product.price}</h3>
                <h4>{product.description}</h4>
                <form id="reviewForm" onSubmit={addReview}>
                    <label htmlFor="rating">rating</label>
                        <select name="rating" id="rating" onChange={(e) => setRating(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <label htmlFor="headline">headline</label>
                        <input
                            type="text"
                            id="headline"
                            autoComplete='off'
                            onChange={(e) => setHeadline(e.target.value)}
                            value={headline}
                            placeholder="what's most important to know?"
                            required
                        />
                        <label htmlFor="review">review</label>
                        <input
                            type="text"
                            id="review"
                            autoComplete='off'
                            onChange={(e) => setReview(e.target.value)}
                            value={review}
                            placeholder='review'
                            required
                        />
                        {/* <textarea
                            name="review"
                            form="reviewForm"
                            autoComplete='off'
                            placeholder='what do you like or dislike?'
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        /> */}
                        <button type="submit">submit</button>
                </form>
            </div>
        </div>
    )
}

export default ProductReviewPopup