import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_REVIEW_TO_STORE, GET_REVIEWS, GET_USER_REVIEW, SAVE_REVIEW_TO_DB } from '../state/Products/productAction'
import checkMark from '../images/check.png'

import '../styles/components/ProductReviewPopup.scss'

const ProductReviewPopup = (props) => {
    const {toggle, product} = props
    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer.user)
    const review = useSelector(state => state.productReducer.reviews)
    const [rating, setRating] = useState(1)
    const [headline, setHeadline] = useState('')
    const [prodReview, setProdReview] = useState('')
    const [reviewSubmitted, setReviewSubmitted] = useState(false)

    useEffect(() => {
        dispatch(GET_USER_REVIEW(product._id, user._id))
        console.log('refresh')
        console.log(product._id)
        console.log(user._id)
        console.log(review)

        return () => {
            dispatch(ADD_REVIEW_TO_STORE())
            setReviewSubmitted(false)
        }
    }, [product])

    const addReview = (e) => {
        e.preventDefault()
        
        const review = {
            userid: user._id,
            userName: user.userName,
            orderid: product._id,
            rating: rating,
            headline: headline,
            review: prodReview
        }

        dispatch(SAVE_REVIEW_TO_DB(product._id, review))
        setReviewSubmitted(true)
    }
    console.log("reviews", review)

    return (
        <div className="reviewPopup">
            <div className="popup-content">
                <span className="close" onClick={toggle}>&times;</span>
                <h2>add product review</h2>
                <div className='prodInfo'>
                    <div className='prodImg'></div>
                    <div className='prodDetails'>
                        <h3>name: {product.name}</h3>
                        <h4>description: {product.description}</h4>
                        <h4>price: ${product.price.toFixed(2)}</h4>
                    </div>
                </div>
                {review && review.length >= 1 ?
                <div className='reviewExists'>
                    <img src={checkMark} alt='check mark' />
                    <h4>you have already written a review for this product</h4>
                </div>
                :
                !reviewSubmitted ?
                <form id="reviewForm" onSubmit={(e) => addReview(e)}>
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
                        {/* <input
                            type="text"
                            id="review"
                            autoComplete='off'
                            onChange={(e) => setProdReview(e.target.value)}
                            value={prodReview}
                            placeholder='review'
                            required
                        /> */}
                        <textarea
                            name="review"
                            id="review"
                            form="reviewForm"
                            autoComplete='off'
                            placeholder='what do you like or dislike?'
                            value={prodReview}
                            onChange={(e) => setProdReview(e.target.value)}
                            required
                        />
                        <button type="submit">submit</button>
                </form>
                :
                <div className='reviewSubmit'>
                    <img src={checkMark} alt='check mark' />
                    <h4>review submitted!</h4>
                </div>
                }
            </div>
        </div>
    )
}

export default ProductReviewPopup