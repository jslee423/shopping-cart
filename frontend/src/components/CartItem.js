import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { REMOVE_ITEM_FROM_CART, UPDATE_ITEM_IN_CART } from '../state/Cart/cartAction'
import trashImg from '../images/trash.png'

import '../styles/components/CartItem.scss'

const CartItem = (props) => {
    const item = props.item
    const [newQuantity, setNewQuantity] = useState(item.quantity)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(UPDATE_ITEM_IN_CART(item._id, newQuantity))
    }, [newQuantity])

    const quantityOnChange = (e) => {
        const value = e.target.value
        setNewQuantity(value)
    }

    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>{
                props.readOnly ? newQuantity : 
                location.pathname === '/cart' ?
                <input className='cartqty' id={`cartqty${item.name}`} type="number" value={newQuantity} onChange={(e) => quantityOnChange(e)}></input>
                : item.quantity
            }</td>
            <td>${(item.quantity * item.price).toFixed(2)}</td>
            {
                props.readOnly ? "" :
                location.pathname === '/cart' ?
                <>
                    <td><button onClick={()=>{dispatch(REMOVE_ITEM_FROM_CART(item._id))}} id="removeIcon"><img src={trashImg} alt="trash can icon"/></button></td>
                </>
                : ""
            }
        </tr>
    )
}

export default CartItem