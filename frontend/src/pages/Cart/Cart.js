import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../../components/Cart/CartItem'
import CartSummary from '../../components/Cart/CartSummary'
import { EMPTY_CART, SAVE_CART_TO_DB } from '../../state/Cart/cartAction'
import { useNavigate } from 'react-router-dom'
import './Cart.scss'

const Cart = (props) => {
    const cartList = useSelector(state => state.cartReducer)
    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (user._id) {
            dispatch(SAVE_CART_TO_DB(cartList, user._id))
        }
    }, [cartList])

    const recalculate = (cartItems)  => {
        let amount = 0
        let count = 0

        for (let item of cartItems) {
            amount += item.quantity * item.price
            count += item.quantity
        }

        return {
            amount,
            count
        }
    }

    // const clickToSaveCart = (cart, userid) => {
    //     if (!userid) {
    //         alert("Please sign in to save the cart")
    //     } else {
    //         dispatch(SAVE_CART_TO_DB(cart, userid))
    //     }
    // }

    const checkout = (event)=>{
        navigate('/checkout');
        event.preventDefault();
    }

    return (
        <div className='cart'>
            <h1>shopping cart</h1>
            <div className='cartItemList'>
                {
                    cartList && cartList.length >= 1 ?
                    <>
                    <table>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>description</th>
                                <th>price</th>
                                <th>quantity</th>
                                <th>total</th>
                                {/* {
                                    props.readOnly ? "" : //by default false
                                    <>
                                        <th></th>
                                        <th>Edit</th>
                                    </>
                                } */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartList.map(item => {
                                    return <CartItem item={item} readOnly={props.readOnly} key={item._id} />
                                })
                            }
                        </tbody>
                    </table>
                    <CartSummary data={recalculate(cartList)} readOnly={props.readOnly} />
                    {
                        props.readOnly ? <></> :
                        <div className='cartButtons'>
                            {/* <button onClick={() => {clickToSaveCart(cartList, user._id)}}>save cart</button> */}
                            <button onClick={() => {dispatch(EMPTY_CART())}}>empty cart</button>
                            <button onClick={checkout}>checkout &#8614;</button>
                        </div>
                    }
                </>
                    : <h2>your cart is empty</h2>
                }
            </div>
        </div>
    )
}

export default Cart