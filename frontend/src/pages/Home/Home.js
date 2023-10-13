import React from 'react'
import { useSelector } from 'react-redux'

import './Home.scss'

const Home = () => {
    const userName = useSelector(state => state.userReducer.user.userName)

    return (
        <div className='home'>
            {userName ? <h1>welcome back, {userName}</h1> : <h1>shopping cart</h1>}
        </div>
    )
}

export default Home