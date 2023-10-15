import React from 'react'

import '../styles/components/PaymentForm.scss'

const PaymentForm = (props) => {
    // const { className, handleSubmit } = props;
    return (
        // <form id='paymentForm'>
        //     <input
        //         type="text"
        //         id="name"
        //         placeholder='name'
        //     />
        //     <input
        //         type="text"
        //         id="cardNumber"
        //         placeholder='____-____-____-____'
        //     />
        //     <input
        //         type="text"
        //         id="expiration"
        //         placeholder='expiration'
        //     />
        //     <input
        //         type='text'
        //         id='ccv'
        //         placeholder='ccv'
        //     />
        // </form>
        <form class="credit-card-form">
            <label for="nameOnCard">name on card</label>
            <input type="text" id="nameOnCard" class="name-on-card" placeholder="enter name on card"/>
            <label for="cardNumber">card number</label>
            <input type="text" id="cardNumber" class="card-number" placeholder="____-____-____-____"/>


            <label for="expirationDate">expiration</label>
            <input type="text" id="expirationDate" class="expiration-date" placeholder="mm/yy"/>

            <label for="cvv">cvv</label>
            <input type="text" id="cvv" class="cvv" placeholder="cvv"/>

            <button type="submit">save</button>
        </form>
)
}

export default PaymentForm