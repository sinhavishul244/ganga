import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { AUTH_URL, CURRENT_USER_URL, GET_ALL_PRODUCTS } from '../secrets/links';
import SwiperCustom from '../components/SwipeCustom';
import { Container } from '@mui/material';
import ProductCard from '../components/ProductCard';
import Phone from '../assets/phone.png';
import ProductCardContainer from '../components/ProductCardContainer';
import useShopping from '../hooks/useShopping';


const Homepage = () => {
    const { auth, setCurrentUser } = useAuth();
    const { products, setProducts } = useShopping();


    useEffect(() => {
        const addCurrentUser = async () => {
            try {
                const currentUser = await axios.get(`${AUTH_URL}/${CURRENT_USER_URL}`, {
                    headers: {
                        'Authorization': `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true
                });
                const currUserData = currentUser.data;
                setCurrentUser(currUserData);
                localStorage.setItem('currentUser', JSON.stringify(currUserData));
            } catch (err) {
                toast.error("No response from server");
            }
        }

        const addAllProducts = async () => {
            try {
                const prod = await axios.get(`/${GET_ALL_PRODUCTS}`, {
                    headers: {
                        'Authorization': `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true
                });
                const data = prod.data;
                setProducts(data);
                // console.log(data);
            } catch (err) {
                toast.error("No response from server");
            }
        }
        addAllProducts();
        addCurrentUser();
    }, [])

    return (
        <>
            <Container className="homepage">
                <SwiperCustom />
                {/* <ProductCard image={Phone} /> */}
                <ProductCardContainer title={"See what's new on Ganga"} products={products} />
            </Container>

        </>
    )
}

export default Homepage