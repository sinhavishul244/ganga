import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNav from '../components/adminNav';
import RiverBg from '../components/riverBg';
import useAuth from '../hooks/useAuth';

const Admin = () => {

    const { logoutHandler } = useAuth();


    return (
        <>
            <RiverBg />
            <h1>Admin</h1>
            <AdminNav />
            <button className='button-primary' onClick={logoutHandler}>Logout</button>
            <Outlet />
        </>
    )
}

export default Admin