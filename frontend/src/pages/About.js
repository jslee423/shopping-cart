import React from 'react'
import { motion } from 'framer-motion'

import '../styles/pages/About.scss'

const About = () => {
    return (
        <motion.div 
            className='about'
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0, transition: {duration: 0.1} }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ width: window.innerWidth, transition: {duration: 0.1} }}
        >
            <h1>about</h1>
            <p>MERN full stack shopping cart application</p>
        </motion.div>
    )
}

export default About