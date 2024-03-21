import React from 'react'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom';

const Homepage = () => {
    const { auth, logoutHandler } = useAuth();
    return (
        <>
            <div>Homepage</div>
            <div>{auth.user}</div>
            <Link to={"/admin/users"}>Admin Page</Link>
            <button className='button-primary' onClick={logoutHandler}>Logout</button>

        </>
    )
}

export default Homepage