import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { setAuth } = useAuth();

    useEffect(() => {
        const verifyToken = () => {
            const auth = localStorage.getItem('auth');
            if (auth) {
                setAuth(JSON.parse(auth));
            }
            setIsLoading(false);
        }
        verifyToken();
    }, [])

    return (
        <>
            {
                isLoading ? <LoadingScreen /> :
                    <Outlet />
            }
        </>
    )
}

export default PersistLogin;