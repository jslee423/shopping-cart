import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { LOGIN_USER } from '../../state/User/userAction'
import { ADD_ERROR_TO_STORE } from '../../state/Errors/errorAction' 

import './Login.scss'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const error = useSelector(state => state.errorReducer)

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
        
        dispatch(LOGIN_USER(user, password, navigate))
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
        <section className='login'>
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
                    type={error.status === 401 ? "text" : "password"}
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
        </section>
    )
}

export default Login