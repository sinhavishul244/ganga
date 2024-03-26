import { Box, Button, Container, Rating, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Phone from '../assets/phone.png';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ADD_PRODUCT_TO_CART, GET_CURRENT_PRODUCT } from '../secrets/links';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import useShopping from '../hooks/useShopping';

const Product = () => {
    const { auth } = useAuth();
    const { updateCartData } = useShopping();

    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    });
    const param = useParams();
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);

    const addToCart = async () => {
        if (!auth) return toast.error("Please login first !");

        console.log(param.id);
        try {
            const res = await axios.post(`${param.id}/${ADD_PRODUCT_TO_CART}`, { "productQuantity": 1 }, {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                },
                withCredentials: true
            });
            updateCartData();
            // const data = res.data;
            // console.log(data);
        } catch (err) {
            console.log(err);
        }

    }


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });

        const getCurrentProductDetails = async () => {
            try {
                const prod = await axios.get(`${param.id}/${GET_CURRENT_PRODUCT}`, {
                    headers: {
                        'Authorization': `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true
                });
                const data = prod.data;
                // setProducts(data);
                // console.log(data);
                setTitle(data.productName);
                setPrice(formatter.format(data.productPrice));
                setDescription(data.productDescription);
                setRating(data.productRating);

            } catch (err) {
                toast.error("No response from server");
            }
        }

        getCurrentProductDetails();
    }, [])


    return (
        <Container>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={Phone} style={{ height: 400 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, height: '90vh', py: 10 }}>
                    <Typography variant='h3'>{title}</Typography>
                    <Typography variant='h5'>{price}</Typography>
                    <Rating value={rating} precision={0.5} readOnly size='large' />
                    <Button variant='contained' endIcon={<AddShoppingCartIcon sx={{ fill: 'white' }} />} sx={{ width: 200 }} onClick={addToCart}>Add to Cart</Button>
                    <Typography variant='body1' sx={{ mt: 5 }}>
                        {description}
                    </Typography>
                </Box>

            </Box>

        </Container>
    )
}

export default Product