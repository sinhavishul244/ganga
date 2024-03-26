import { Box, Button, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const pages = ['Users', 'Products', 'Categories'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const AdminNav = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const { logoutHandler } = useAuth();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar position='static' elevation={0} sx={{
                height: 'clamp(2rem,10vh,2.5rem)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "#0087D1",

            }} >
                <Toolbar sx={{ display: 'flex', height: "100% ", flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    {/* <img src={logo} className='logo' /> */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => {
                                    handleCloseNavMenu();
                                    navigate(`/admin/${page.toLowerCase()}`);
                                }}
                                sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none', ":hover": { backgroundColor: "primary.dark" } }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>

            </AppBar>
            {/* <div className="admin-nav nav">
                <ul>
                    <li>Users</li>
                    <li>Products</li>
                    <li>Categories</li>
                </ul>
            </div> */}
        </>
    )
}

export default AdminNav