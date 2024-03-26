import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { setAuth, setCurrentUser } = useAuth();

    useEffect(() => {
        const verifyToken = () => {
            const auth = localStorage.getItem('auth');
            const currentUser = localStorage.getItem('currentUser');
            if (auth) {
                setAuth(JSON.parse(auth));
                setCurrentUser(JSON.parse(currentUser));
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