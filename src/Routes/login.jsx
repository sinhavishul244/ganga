import React, { useRef, useState, useEffect } from 'react'
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'
import { LOGIN_URL, AUTH_URL } from '../secrets/links'

const Login = () => {

    const { setAuth, auth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${AUTH_URL}/${LOGIN_URL}`,
                JSON.stringify({ username: user, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            console.log(response?.data);
            const accessToken = response?.data?.token;
            const roles = response?.data?.roles;
            setAuth({ user, password, roles, accessToken });
            setUser('');
            setPassword('');
            console.log(auth);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                console.log(err?.response?.data)
                setErrMsg(err?.response?.data?.message || "sign up error");
            }
        }
    }

    return (
        (
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button>Sign In</button>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="line">
                        <a href="#">Sign Up</a>
                    </span>
                </p>
            </section>
        )
    )
}

export default Login