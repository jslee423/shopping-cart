import React from 'react'
import './Home.scss'
import { useSelector } from 'react-redux'

const Home = () => {
    const userName = useSelector(state => state.userReducer.user.userName)

    return (
        <div className='home'>
            {userName ? <h1>welcome back, {userName}</h1> : <h1>shopping cart</h1>}
            {/* <p>full stack shopping cart</p> */}
        </div>
    )
}

export default Home