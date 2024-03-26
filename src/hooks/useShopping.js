import ShoppingContext from "../context/ShoppingProvider";
import { useContext } from "react";

const useShopping = () => useContext(ShoppingContext);

export default useShopping;