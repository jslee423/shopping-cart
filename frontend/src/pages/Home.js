import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

import '../styles/pages/Home.scss'

const Home = () => {
    const user = useSelector(state => state.userReducer.user)

    return (
        <motion.div
            className='home'
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0, transition: {duration: 0.1} }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ width: window.innerWidth, transition: {duration: 0.1} }}
        >
            {user.userName ? <h1>welcome back, {user.userName}</h1> : <h1>shopping cart</h1>}
        </motion.div>
    )
}

export default Home