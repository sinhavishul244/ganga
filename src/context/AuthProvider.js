import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    // states for currently registered users
    const [isRegistered, setIsRegistered] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const logoutHandler = () => {
        setAuth(null);
        localStorage.removeItem('auth');
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, isRegistered, setIsRegistered, email, setEmail, name, setName, logoutHandler }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;