import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { LOGOUT_USER } from '../state/User/userAction'
import exitImg from '../images/exit.png'

import '../styles/components/Navbar.scss'

const Navbar = () => {
    const user = useSelector(state => state.userReducer.user)
    const cartList = useSelector(state => state.cartReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const recalculate = (cartItems)  => {
        let count = 0

        for (let item of cartItems) {
            count += item.quantity
        }

        return count
    }

    const logout = () => {
        dispatch(LOGOUT_USER(navigate))
    }

    const refreshPage = () => {
        window.location.reload(false);
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
                {user._id && <button id='logout' title="logout" onClick={() => refreshPage()}><img src={exitImg} alt='logout icon' /></button>}
                <NavLink to={user._id ? "/profile" : "/login"} activelassname="active">{user._id ? user.userName : "login"}
                </NavLink>
                <NavLink to="/cart" activeclassname="active">cart <span id='cartCount'>({recalculate(cartList)})</span></NavLink>
            </nav>
        </nav>
    )
}

export default Navbar