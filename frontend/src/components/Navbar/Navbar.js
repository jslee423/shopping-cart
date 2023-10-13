import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import cartImg from '../../images/cart.png'
import './Navbar.scss'

const Navbar = () => {
    const user = useSelector(state => state.userReducer.user)
    const cartList = useSelector(state => state.cartReducer)

    const recalculate = (cartItems)  => {
        let count = 0

        for (let item of cartItems) {
            count += item.quantity
        }

        return count
    }

    return (
        <nav className='navbar' id="navbar">
            <nav id="navleft">
                <NavLink to="/" activeclassname="active">home</NavLink>
            </nav>
            <nav id="navmiddle">
                <NavLink to="/products" activeclassname="active">products</NavLink>
                <NavLink to="/about" activeclassname="active">about</NavLink>
            </nav>
            <nav id="navright">
                <NavLink to="/login" activeclassname="active">{user.userName ? user.userName : "login"}</NavLink>
                {/* <NavLink to="/cart" activeClassName="active"><img src={cartImg} alt="cart icon" id="cartIcon" /></NavLink> */}
                <NavLink to="/cart" activeclassname="active">cart <span id='cartCount'>({recalculate(cartList)})</span></NavLink>
            </nav>
        </nav>
    )
}

export default Navbar