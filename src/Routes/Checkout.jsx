import { Box, Button, Container, Paper, Typography, FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import useShopping from '../hooks/useShopping'
import { useEffect } from 'react';
import axios from '../api/axios';
import { PAY } from '../secrets/links';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { toastOptions } from '../configs/configs';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, checkout, updateCartData } = useShopping();
    const { auth } = useAuth();

    const [paymentMethod, setPaymentMethod] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const paymentHandler = async () => {
        try {
            const res = await axios.post(`${checkout.checkoutId}/${PAY}`, {
                "paymentMethod": "COD"
            }, {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                },
                withCredentials: true
            })


            toast.success(res?.data?.message, toastOptions);
            updateCartData();
            // console.log(res.data);
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container sx={{ py: 2 }}>
            <Typography variant='h4'>Checkout</Typography>
            <Typography>Your Products</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {
                    cart.map((product) => {
                        return (
                            <Paper
                                id={product.productUserId?.productId}
                                key={product.productUserId?.productId}
                                elevation={3}
                                sx={
                                    {
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: 80,
                                        p: 2
                                    }}
                            >
                                <Typography variant='h6'>{product.productName}</Typography>
                            </Paper>
                        )
                    })
                }

            </Box>
            <Box sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                backgroundColor: "primary.main",
                width: '100vw',
                padding: 1,
                zIndex: 40,
                display: 'flex',
                justifyContent: 'space-between'
            }}>

                <Box color={"white"}>
                    <Typography color={'white'}>Product Amount : {checkout.productAmount}</Typography>
                    <Typography color={'white'}>Shipping Charge : {checkout.shippingAmount}</Typography>
                    <Typography color={'white'}>Total Charge : {checkout.totalAmount}</Typography>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>Payment method</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={paymentMethod}
                            label="Payment method"
                            onChange={handleChange}
                            sx={{
                                borderColor: 'white',
                                fill: 'white',
                                color: 'white'
                            }}
                        >
                            <MenuItem value={"COD"}>Cash On Delivery</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button variant='outline' onClick={paymentHandler} sx={{ color: "white" }}>
                    Buy Now
                </Button>
            </Box>
        </Container >
    )
}

export default Checkout