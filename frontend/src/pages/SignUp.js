import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SAVE_USER_TO_DB } from '../state/User/userAction'
import { ADD_ERROR_TO_STORE } from '../state/Errors/errorAction' 

import '../styles/pages/SignUp.scss'

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const error = useSelector(state => state.errorReducer)
    const cartList = useSelector(state => state.cartReducer)

    const userRef = useRef()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')
    const [mobileFormatted, setMobileFormatted] = useState('');
    
    useEffect(() => {
        dispatch(ADD_ERROR_TO_STORE(null, ''))
    }, [userName, password, firstName, lastName, address, mobile])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const user = {
            userName: userName,
            password: password,
            firstName: firstName,
            lastName: lastName,
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
        console.log(error)
        if (id === "username" && error.status) {
            setUserName('')
        } else if (id === "password" && error.status) {
            setPassword('')
        } else if (id === "address" && error.status) {
            setAddress('')
        } else if (id === "mobile" && error.status) {
            setMobile('')
        } else if (id === "firstName" && error.status) {
            setMobile('')
        } else if (id === "lastName" && error.status) {
            setMobile('')
        }
    }


    const handlePhoneNumberChange = (event) => {
        const inputPhoneNumber = event.target.value.replace(/\D/g, '');
        const formattedPhoneNumber = formatPhoneNumber(inputPhoneNumber);
        setMobileFormatted(formattedPhoneNumber);
        setMobile(inputPhoneNumber)
    };

    const formatPhoneNumber = (phoneNumber) => {
        const phoneNumberLength = phoneNumber.length;

        if (phoneNumberLength < 4) {
            return phoneNumber;
        } else if (phoneNumberLength < 7) {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        } else {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
        }
    }

    return (
        <motion.section 
            className='signup'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: {duration: 0.1} }}
        >
            <h1>sign up</h1>
            <p className="errorMessage" aria-live="assertive">{error.message}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUserName(e.target.value)}
                    onClick={resetInputs}
                    value={userName}
                    placeholder='username'
                    required
                />
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
                    id="firstName"
                    autoComplete='off'
                    onChange={(e) => setFirstName(e.target.value)}
                    onClick={resetInputs}
                    value={firstName}
                    placeholder='first name'
                    required
                />
                <input
                    type="text"
                    id="lastName"
                    autoComplete='off'
                    onChange={(e) => setLastName(e.target.value)}
                    onClick={resetInputs}
                    value={lastName}
                    placeholder='last name'
                    required
                />
                <input
                    type="text"
                    id="address"
                    autoComplete='off'
                    onChange={(e) => setAddress(e.target.value)}
                    onClick={resetInputs}
                    value={address}
                    placeholder='address'
                    required
                />
                <input
                    type="tel"
                    id="mobile"
                    autoComplete='off'
                    // onChange={(e) => setMobile(e.target.value)}
                    onChange={handlePhoneNumberChange}
                    onClick={resetInputs}
                    // value={mobile}
                    maxLength={12}
                    value={mobileFormatted}
                    placeholder='phone number'
                    required
                />
                <button>register</button>
            </form>
            <p>
                already have an account?<br />
                <span className='line'><NavLink to="/login" activeclassname="active">login</NavLink></span>
            </p>
        </motion.section>
    )
}

export default SignUp