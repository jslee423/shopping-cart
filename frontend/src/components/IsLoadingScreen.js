import React from 'react'
import IsLoading from './IsLoading'

import '../styles/components/IsLoadingScreen.scss'

const IsLoadingScreen = () => {
    return (
        <div className='isLoadingScreen'>
            <IsLoading />
        </div>
    )
}

export default IsLoadingScreen