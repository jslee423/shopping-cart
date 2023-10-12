import React, { useRef, useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { SAVE_USER_TO_DB, LOGIN_USER } from '../state/User/userAction'
import { ADD_ERROR_TO_STORE } from '../state/Errors/errorAction' 
import './SignUp.scss'

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const error = useSelector(state => state.errorReducer)

    const userRef = useRef()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        dispatch(ADD_ERROR_TO_STORE(null, ''))
    }, [userName, password, address, mobile])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const user = {
            userName: userName,
            password: password,
            address: address,
            mobile: mobile
        }

        dispatch(SAVE_USER_TO_DB(user, navigate))
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
        if (id === "username" && error.status != 200) {
            setUserName('')
        } else if (id === "password" && error.status != 200) {
            setPassword('')
        }
    }

    return (
        <section className='signup'>
            <h1>sign up</h1>
            {/* <p ref={errorRef} className={errorMsg ? "errmsg" : "offscreen"} aria-live="assertive">{error.message}</p> */}
            <form onSubmit={handleSubmit}>
                {/* <label htmlFor="username">username:</label> */}
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUserName(e.target.value)}
                    onClick={resetInputs}
                    // value={user}
                    value={error.status === 401 ? error.message : userName}
                    placeholder='username'
                    required
                />
                {/* <label htmlFor="username">password:</label> */}
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    onClick={resetInputs}
                    value={password}
                    placeholder='password'
                    required
                />
                <input
                    type="text"
                    id="address"
                    autoComplete='off'
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    placeholder='address'
                    required
                />
                <input
                    type="tel"
                    id="mobile"
                    autoComplete='off'
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                    placeholder='phone number'
                    required
                />
                <button>register</button>
            </form>
            <p>
                already have an account?<br />
                <span className='line'><NavLink to="/login" activeClassName="active">login</NavLink></span>
            </p>
        </section>
    )
}

export default SignUp