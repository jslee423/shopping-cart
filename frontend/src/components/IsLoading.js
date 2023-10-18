import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

const IsLoading = () => {
    return (
        <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color="rgb(108, 108, 253)" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
    )
}

export default IsLoading