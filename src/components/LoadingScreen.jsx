import React from 'react'
import RiverBg from './riverBg'
import logo from '../assets/logo.svg'
import MoonLoader from 'react-spinners/MoonLoader'

const LoadingScreen = () => {
    return (
        <>
            <RiverBg />
            <div className="loader-circle">
                <img src={logo} />
                <MoonLoader color='white' speedMultiplier={0.3} size={100} />
                <h3>Loading ...</h3>
            </div>
        </>
    )
}

export default LoadingScreen