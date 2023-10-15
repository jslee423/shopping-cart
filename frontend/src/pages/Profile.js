import React from 'react'
import { motion } from 'framer-motion'

import '../styles/pages/Profile.scss'

const Profile = () => {
    return (
        <motion.div 
            className='profile'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: {duration: 0.1} }}
        >
            <h1>profile</h1>
        </motion.div>
    )
}

export default Profile