import Star from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box, Divider, Paper, Rating, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';



const ProductCard = ({ id, image, title, rating, price }) => {
    const navigate = useNavigate();

    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    });

    const clickHandler = () => {
        navigate(`/product/${id}`);
    }

    return (
        <Paper onClick={clickHandler} sx={{ transition: 'transform 0.2s', ":hover": { transform: "scale(1.03)", cursor: 'pointer ' } }} elevation={3} >
            <Box sx={{

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 1

            }}>
                <img src={image} style={{ height: 200 }} />
            </Box>
            <Divider />
            <Box sx={{ padding: 1 }}>
                <Link>
                    <Typography variant='h6' sx={{ padding: 1, color: "primary.main" }}>{title}</Typography>
                </Link >
                <Rating value={rating} size="small" precision={0.5} readOnly icon={<Star sx={{ fill: "#FBD361", fontSize: "medium" }} />} emptyIcon={<StarBorderIcon sx={{ fill: "#D9D9D9", fontSize: "medium" }} />} />
                <Typography> {formatter.format(price)}</Typography>
            </Box>
        </Paper>
    )
}

export default ProductCard