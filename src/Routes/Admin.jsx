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
            <AdminNav />
            <Outlet />
        </>
    )
}

export default Admin