import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar, Badge, Box, Button, Checkbox, IconButton, Menu, MenuItem, Paper, Toolbar, Tooltip, Typography, alpha, useScrollTrigger } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import useAuth from '../hooks/useAuth';
// import * as React from 'react';
// import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import useShopping from '../hooks/useShopping';
import axios from '../api/axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ADD_ADDRESS, CHECKOUT, UNSELECT_PRODUCT_FROM_CART } from '../secrets/links';



const NavBar = () => {
    //hooks
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [cartOpen, setCartOpen] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const { logoutHandler, currentUser, auth } = useAuth();
    const { cartCount, cart, updateCartData, setCheckout } = useShopping();
    const navigate = useNavigate();


    const trigger = useScrollTrigger({ threshold: 0, disableHysteresis: true });

    // handlers
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const toggleCart = (newCartOpen) => () => {
        setCartOpen(newCartOpen);
    };


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleUnselect = (id) => async () => {
        try {
            const res = await axios.put(`${id}/${UNSELECT_PRODUCT_FROM_CART}`, {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`
                },
                withCredentials: true
            })
            updateCartData();
        } catch (error) {
            console.log("error is " + error);
        }
    }

    const handleCheckout = async () => {
        try {
            const res = await axios.get(`${CHECKOUT}`, {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`
                },
                withCredentials: true
            })
            // console.log(res.data);
            const data = res.data;
            setCheckout(data);
            updateCartData();
            navigate("/checkout");
            setCartOpen(false);
        } catch (error) {
            if (error?.response?.status === 502) {
                // console.log("no address found for the user")
                handleClickOpen();
            }
            else console.log(error);
        }
    }

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    useEffect(() => {
        updateCartData();
    }, [])


    const CartDrawerList = (
        <Box role='presentation' sx={{ width: 700, padding: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h4'>Cart</Typography>
                <Typography variant='h6' sx={{ color: 'rgba(0, 0, 0, 0.5)' }}>{cartCount} items</Typography>
            </Box>
            <Divider></Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {
                    cart.map((product) => {
                        return (
                            <Paper id={product.productUserId?.productId} key={product.productUserId?.productId} sx={{ display: 'flex', alignItems: 'center', height: 80 }}>
                                <Checkbox checked={product.select} onChange={handleUnselect(1)} />
                                <Typography variant='h6'>{product.productName}</Typography>
                            </Paper>
                        )
                    })
                }
            </Box>
            <Button variant='contained' sx={{ mt: 1 }} onClick={handleCheckout}>Checkout</Button>
        </Box >
    )

    const DrawerList = (
        <Box sx={{ width: 250, height: '100%', backgroundColor: 'rgba(255,255,255,0.6)' }} role="presentation" onClick={toggleDrawer(false)}>
            <Box sx={{ padding: '1rem' }} >
                <Typography variant='h6' >Categories</Typography>
            </Box>
            <Divider />

            <List>
                {['Mobile', 'TV', 'Appliances', 'Games', 'Fashion'].map((text, index) => (
                    <ListItem key={index} disablePadding >
                        <ListItemButton id='hi'>
                            <ListItemText id='hello' primary={text} onClick={(e) => {
                                console.log(e.target.innerText);
                            }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />

        </Box>
    );


    return (
        <>
            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const name = formJson.name;
                        const address = formJson.address;
                        const phone = formJson.phone;
                        // console.log(name + address + phone);
                        try {
                            const res = await axios.post(`${ADD_ADDRESS}`, {
                                "buyerName": name,
                                "buyerAddress": address,
                                "buyerPhone": phone
                            },
                                {
                                    headers: {
                                        'Authorization': `Bearer ${auth.accessToken}`,
                                    },
                                    withCredentials: true
                                }
                            );
                        } catch (error) {
                            console.log("error occured while adding address")
                        } finally {
                            handleClose();
                        }
                    },
                }}
            >
                <DialogTitle>Add address</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You have not added any address. Please add an address to checkout !
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Your Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="address"
                        name="address"
                        label="Your Address"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="phone"
                        name="phone"
                        label="Your Phone"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add address</Button>
                </DialogActions>
            </Dialog>

            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>

            <Drawer open={cartOpen} onClose={toggleCart(false)} anchor='right'>
                {CartDrawerList}
            </Drawer>

            <AppBar position='sticky' elevation={0} sx={{
                height: 'clamp(2rem,10vh,2.5rem)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 99,
                padding: 3,
                backgroundColor: !trigger ? 'primary.main' : '#0088d199',
                backdropFilter: !trigger ? 'blur(0px)' : 'blur(20px)'
            }} >
                <Toolbar sx={{ display: 'flex', height: "100% ", flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box className="navLogoContainer">
                        <IconButton onClick={toggleDrawer(true)} >
                            <MenuIcon sx={{ fill: "white" }} />
                        </IconButton>
                        <Tooltip title="Go to homepage">
                            <img src={logo} alt="Log" className='logo nav-logo' onClick={() => {
                                navigate("/#");
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }} />
                        </Tooltip>
                    </Box>
                    <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={toggleCart(true)}>
                            <Badge badgeContent={cartCount} color="error">
                                <ShoppingBagIcon sx={{ fill: "white" }} />
                            </Badge>
                        </IconButton>
                        <Tooltip title="Open settings">
                            <Button onClick={handleOpenUserMenu} sx={{
                                px: 1, py: '3px', height: '100% ', textTransform: 'none', display: 'flex', gap: 1, ":hover": {
                                    backgroundColor: "primary.dark"
                                }
                            }} disableTouchRipple >
                                <Avatar alt={currentUser?.userFullName} src="/static/images/avatar/2.jpg" sx={{ height: '2rem', width: '2rem' }} />
                                <Typography sx={{ fontSize: '1rem', fontWeight: '400', color: 'white' }}>{currentUser?.userFullName?.split(" ")[0]}</Typography>
                                <KeyboardArrowDownIcon color='white' sx={{ fill: "white" }} />
                            </Button>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{"Profile"}</Typography>
                            </MenuItem>

                            {
                                auth?.roles[0].roleId === 501 && (<MenuItem onClick={() => {
                                    handleCloseUserMenu();
                                    navigate("/admin/users");
                                }}>
                                    <Typography textAlign="center">{"Admin"}</Typography>
                                </MenuItem>)
                            }

                            <MenuItem onClick={() => {
                                logoutHandler();
                            }}>
                                <Typography textAlign="center">{"Logout"}</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar