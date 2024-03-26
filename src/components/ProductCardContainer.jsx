import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import ProductCard from './ProductCard'

const ProductCardContainer = ({ title, products }) => {
    return (
        <>
            <Box sx={{ py: 8 }}>
                <Typography variant='h5' sx={{ marginBottom: 1 }}>{title}</Typography>
                <Grid container sx={{ gap: 1 }}>
                    {products?.map((product) => {
                        return (
                            <Grid key={product.productId} item xs={2.9} >
                                <ProductCard id={product.productId} image={product.image} title={product.productName} rating={product.productRating} price={product.productPrice} />
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </>
    )
}

export default ProductCardContainer