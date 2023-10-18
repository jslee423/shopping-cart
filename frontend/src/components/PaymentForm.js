import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {ADD_ORDER_TO_STORE } from '../state/Order/orderAction'


import '../styles/components/PaymentForm.scss'

const PaymentForm = (props) => {
    const dispatch = useDispatch()
    const currentOrder = useSelector(state => state.orderReducer.order)
    const [name, setName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [formattedCardNumber, setFormattedCardNumber] = useState('')
    const [expiration, setExpiration] = useState('')
    const [cvv, setCvv] = useState('')
    const [cardSaved, setCardSaved] = useState('')

    const onChangeFunc = (e) => {
        const input = e.target.value.replace(/\D/g, '');
        const id = e.target.id;

        if (id === "expirationDate") {
            const formattedExpiration = formatInput(input, 'exp');
            setExpiration(formattedExpiration)
        } else if (id === "cvv") {
            setCvv(input)
        } else if (id === "cardNumber") {
            const formattedCardNumber = formatInput(input, 'cardNumber')
            setFormattedCardNumber(formattedCardNumber)
            setCardNumber(input)
        }
    }

    const formatInput = (input, field) => {
        const inputLength = input.length;

        if (field === "exp") {
            if (inputLength < 3) {
                return input;
            } else {
                return `${input.slice(0, 2)}/${input.slice(2, 4)}`;
            }
        } else if (field === "cardNumber") {
            if (inputLength < 5) {
                return input
            } else if (inputLength < 9) {
                return `${input.slice(0, 4)}-${input.slice(4, 8)}`
            } else if (inputLength < 13) {
                return `${input.slice(0, 4)}-${input.slice(4, 8)}-${input.slice(8, 12)}`
            } else {
                return `${input.slice(0, 4)}-${input.slice(4, 8)}-${input.slice(8, 12)}-${input.slice(12, 16)}`
            }
        }
    }

    const hideCardNumber = () => {
        const hiddenCard = formattedCardNumber.replace(/\d{4}-\d{4}-\d{4}/g, '****-****-****');
        setFormattedCardNumber(hiddenCard)
    }

    const addCardInfo = (e) => {
        e.preventDefault()
        
        const order = {
            _id: currentOrder._id,
            userid: currentOrder.userid,
            nameOnCard: name,
            cardNumber: cardNumber,
            expiration: expiration,
            cvv: cvv,
            orderItems: currentOrder.orderItems
        }

        dispatch(ADD_ORDER_TO_STORE(order))
        setCardSaved('card information saved \u2713')
    }

    return (
        <form className="credit-card-form" onSubmit={addCardInfo}>
            <p className={cardSaved ? "infoSaved": "infoNotSaved"} aria-live="assertive">{cardSaved}</p>
            <label htmlFor="nameOnCard">name on card</label>
            <input
                type="text"
                id="nameOnCard"
                class="name-on-card"
                placeholder="enter name on card"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
            />
            <label htmlFor="cardNumber">card number</label>
            <input
                type="text"
                id="cardNumber"
                class="card-number"
                placeholder="____-____-____-____"
                minLength={19}
                maxLength={19}
                onChange={(e) => onChangeFunc(e)}
                onBlur={() => {hideCardNumber()}}
                value={formattedCardNumber}
                required
            />
            <label htmlFor="expirationDate">expiration</label>
            <input 
                type="text"
                id="expirationDate"
                class="expiration-date"
                placeholder="mm/yy"
                minLength={5}
                maxLength={5}
                // onChange={(e) => setExpiration(e.target.value)}
                onChange={(e) => {onChangeFunc(e)}}
                value={expiration}
                required
            />

            <label htmlFor="cvv">cvv</label>
            <input
                type="text"
                id="cvv"
                class="cvv"
                placeholder="cvv"
                minLength={3}
                maxLength={3}
                onChange={(e) => {onChangeFunc(e)}}
                value={cvv}
                required
            />

            <button type="submit">save</button>
        </form>
)
}

export default PaymentForm