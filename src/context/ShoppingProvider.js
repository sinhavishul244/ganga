import { createContext, useState } from "react";
import axios from "../api/axios";
import { GET_CART_PRODUCTS } from "../secrets/links";
import useAuth from "../hooks/useAuth";

const ShoppingContext = createContext({});

export const ShoppingProvider = ({ children }) => {

    const { auth } = useAuth();

    const [cartCount, setCartCount] = useState(0);
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checkout, setCheckout] = useState({});

    const updateCartData = async () => {
        // console.log(auth)
        try {
            const res = await axios.get(`${GET_CART_PRODUCTS}`, {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                },
                withCredentials: true
            });
            const data = res.data;
            // console.log(data);
            setCart(data);
            setCartCount(data.length);
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    return (
        <ShoppingContext.Provider value={{ cartCount, setCartCount, cart, setCart, products, setProducts, updateCartData, categories, setCategories, checkout, setCheckout }}>
            {children}
        </ShoppingContext.Provider>
    )
}

export default ShoppingContext;
