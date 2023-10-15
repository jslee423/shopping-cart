import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ADD_USER_TO_STORE } from '../state/User/userAction'

import '../styles/components/CheckoutUserForm.scss'

const CheckoutUserForm = (props) => {
    const user = useSelector(state => state.userReducer.user)
    const error = useSelector(state => state.errorReducer)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')
    const [mobileFormatted, setMobileFormatted] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const user = {
            userName: '',
            password: '',
            firstName: firstName,
            lastName: lastName,
            address: address,
            mobile: mobile
        }

        dispatch(ADD_USER_TO_STORE(user))
        props.updateFormFunc(false)
    }

    const resetInputs = (e) => {
        const id = e.target.id
        console.log(error)
        if (id === "address" && error.status) {
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
        <form onSubmit={handleSubmit} id="checkoutForm">
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
            <button>update</button>
        </form>
    )
}

export default CheckoutUserForm