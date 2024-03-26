import React, { useRef, useState, useEffect } from 'react'
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'
import { LOGIN_URL, AUTH_URL, CURRENT_USER_URL } from '../secrets/links'
import { Link, useNavigate } from 'react-router-dom'
import RiverBg from '../components/riverBg'
import logo from '../assets/logo2.svg'
import { Slide, toast } from 'react-toastify';
import { toastOptions } from '../configs/configs'

const Login = () => {

    const { setAuth, auth, isRegistered, setIsRegistered, email, setEmail, setName, name, setCurrentUser } = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();



    useEffect(() => {
        if (isRegistered) {
            toast.success(`Thanks for Signup ${name} !\n Please Login now.`, { ...toastOptions, autoClose: 6000 });
            setIsRegistered(false);
            setUser(email);
            setEmail("");
            setName("");
        }
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, password])


    useEffect(() => {
        if (auth) {
            toast.warn("You are already Logged in !", { ...toastOptions, toastId: "loggedIn" })
            navigate("/");
        }
    }, [])




    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = toast.loading(`Signing you in ...`, toastOptions);
        try {
            const response = await axios.post(`${AUTH_URL}/${LOGIN_URL}`,
                JSON.stringify({ username: user, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                },
            );

            console.log(response?.data);
            const accessToken = response?.data?.token;
            const roles = response?.data?.roles;
            await setAuth({ user, roles, accessToken });


            localStorage.setItem('auth', JSON.stringify({ user, roles, accessToken }));
            toast.update(id, { type: 'success', render: `Sign In Successful`, isLoading: false, autoClose: 1000 });



            setUser('');
            setPassword('');
            navigate("/");


        } catch (err) {
            if (!err?.response) {
                console.log(err);
                toast.update(id, { render: "No response from server !", type: "error", isLoading: false, autoClose: 3000 });
            } else {
                console.log(err?.response?.data)
                setErrMsg(err?.response?.data?.message || "sign up error");
                toast.update(id, { render: err?.response?.data?.message || "sign up error", type: "error", isLoading: false, autoClose: 3000 });
            }
        }
    }

    return (
        (
            <>
                <RiverBg />
                <div className="login-container">
                    <div className="logo">
                        <img src={logo} />
                    </div>
                    <section className='form-box'>
                        <div className="form-box-main-container">

                            <h1>Sign In</h1>
                            <form onSubmit={handleSubmit} className='main-form'>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    placeholder='enter your email'
                                    required
                                />

                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                    placeholder='enter password'
                                />
                                <button className='button-primary top-margin' type='submit'>Sign In</button>
                                <p>
                                    Need an account? <Link to={"/register"}>Register</Link>
                                </p>
                                {/* <button className='button-secondary' onClick={() => { navigate("/register") }}>Register</button> */}
                            </form>

                        </div>
                    </section>
                </div>
            </>
        )
    )
}

export default Login