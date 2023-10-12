import React from 'react'
import { NavLink } from 'react-router-dom'
import cartImg from '../../images/cart.png'
import './Navbar.scss'

const Navbar = () => {
    return (
        <nav className='navbar' id="navbar">
            <nav id="navleft">
                <NavLink to="/" activeClassName="active" exact>home</NavLink>
            </nav>
            <nav id="navmiddle">
                <NavLink to="/products" activeClassName="active">products</NavLink>
            </nav>
            <nav id="navright">
                <NavLink to="/login" activeClassName="active">login</NavLink>
                {/* <NavLink to="/cart" activeClassName="active"><img src={cartImg} alt="cart icon" id="cartIcon" /></NavLink> */}
                <NavLink to="/cart" activeClassName="active">cart</NavLink>
            </nav>
        </nav>
    )
}

export default Navbar