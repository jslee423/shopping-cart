import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import { LOGIN_USER } from '../state/User/userAction'
import { ADD_ERROR_TO_STORE } from '../state/Errors/errorAction' 

import '../styles/pages/Login.scss'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const error = useSelector(state => state.errorReducer)
    const cartList = useSelector(state => state.cartReducer)

    const userRef = useRef()

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        dispatch(ADD_ERROR_TO_STORE(null, ''))
    }, [user, password])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        dispatch(LOGIN_USER(user, password, cartList, navigate))
    }

    const showPassword = () => {
        var element = document.getElementById("password");
        if (element.type === "password") {
            element.type = "text";
            return error.message
        } else {
            element.type = "password";
        }
      }

    const resetInputs = (e) => {
        const id = e.target.id
        if (id === "username" && error.status) {
            setUser('')
        } else if (id === "password" && error.status) {
            setPassword('')
        }
    }

    return (
        <motion.section
            className='login'
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0, transition: {duration: 0.1} }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ width: window.innerWidth, transition: {duration: 0.1} }}
        >
            <h1>login</h1>
            <p className="errorMessage" aria-live="assertive">{error.message}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    onClick={resetInputs}
                    value={user}
                    placeholder='username'
                    required
                />
                <input
                    // type={error.status === 401 ? "text" : "password"}
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    onClick={resetInputs}
                    value={password}
                    placeholder='password'
                    required
                />
                <button>sign in</button>
            </form>
            <p>
                need an account?<br />
                <span className='line'><NavLink to="/signup" activeclassname="active">sign up</NavLink></span>
            </p>
        </motion.section>
    )
}

export default Login