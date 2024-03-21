import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import logo from '../assets/logo2.svg';
import RiverBg from '../components/riverBg';
import { AUTH_URL, REGISTER_URL } from '../secrets/links';
import { Slide, toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

const USER_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const nameRef = useRef();
    const passRef = useRef();
    const confirmPassRef = useRef();

    const [email, setEmail] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [name, setName] = useState('');


    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);


    const { setName: setRName, setEmail: setREmail, setIsRegistered } = useAuth();

    const navigate = useNavigate();

    const toastWarnConfig = {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
        toastId: "registerPage"
    };

    const toastIsLoadingConfig = {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
    };

    useEffect(() => {
        nameRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === "") {
            toast.warn("Please enter your name !", toastWarnConfig);
            nameRef.current.focus();
            return;
        }
        if (email === "") {
            toast.warn("Please enter your email !", toastWarnConfig);
            userRef.current.focus();
            return;
        }
        const v1 = USER_REGEX.test(email);
        if (!v1) {
            toast.error("Enter a vaild email !", toastWarnConfig);
            userRef.current.focus();
            return;
        }

        if (password === "") {
            toast.warn("Please enter your password !", toastWarnConfig);
            passRef.current.focus();
            return;
        }

        const v2 = PASSWORD_REGEX.test(password);
        if (!v2) {
            toast.warn("Password must include uppercase and lowercase letters, a number and a special character!", toastWarnConfig);
            passRef.current.focus();
            return;
        }


        if (password !== matchPassword) {
            toast.warn("Passwords must match !", toastWarnConfig);
            confirmPassRef.current.focus();
            return;
        }

        const id = toast.loading("Signing up...", toastIsLoadingConfig);
        try {
            const response = await axios.post(`${AUTH_URL}/${REGISTER_URL}`,
                JSON.stringify({ userEmail: email, userPassword: password, userFullName: name }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(JSON.stringify(response?.data));
            toast.update(id, { render: "User Created Successfully", type: "success", isLoading: false, autoClose: 2000 });
            setREmail(email);
            setRName(name.split(" ")[0]);
            setIsRegistered(true);
            setName('');
            setEmail('');
            setPassword('');
            setMatchPassword('');
            navigate("/login");

        } catch (err) {
            if (!err?.response) {
                toast.update(id, { render: "No Response from server !", type: "error", isLoading: false, autoClose: 3000 });
            } else if (err.response?.data?.success === false) {
                toast.update(id, { render: err?.response?.data?.message, type: "error", isLoading: false, autoClose: 3000 });
                setEmail('');
                userRef.current.focus();
            } else {
                toast.update(id, { render: 'Registration Failed', type: "error", isLoading: false, autoClose: 3000 });
            }

        }
    }

    return (
        <>
            <RiverBg />
            <div className="login-container">
                <div className="logo">
                    <img src={logo} />
                </div>
                <section className='form-box'>
                    <div className="form-box-main-container">


                        <h1>Register</h1>
                        <form onSubmit={handleSubmit} className='main-form'>

                            <label htmlFor="name">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                autoComplete="off"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                // required
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                placeholder='enter your full name'
                                ref={nameRef}
                            />

                            <label htmlFor="email">
                                Email:
                            </label>
                            <input
                                type="text"
                                id="email"
                                ref={userRef}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                // required
                                autoComplete="off"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                placeholder='enter your email'
                            />

                            {/* <p id="uidnote" className={userFocus && email && !validName ? "instructions" : "offscreen"}>
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p> */}


                            <label htmlFor="password">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                // required
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                placeholder='enter your password'
                                ref={passRef}
                            />
                            {/* <p id="pwdnote" className={pwdFocus && !validPassword ? "instructions" : "offscreen"}>

                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p> */}


                            <label htmlFor="confirm_pwd">
                                Confirm password:
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPassword(e.target.value)}
                                value={matchPassword}
                                // required
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                placeholder='please confirm password'
                                ref={confirmPassRef}
                            />
                            {/* <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                Must match the first password input field.
                            </p> */}
                            {/* disabled={!validName || !validPassword || !validMatch ? true : false} */}
                            <button className='top-margin button-primary'>Sign Up</button>
                            <p>
                                Already registered? <Link to={'/login'}>Login here</Link>
                            </p>
                            {/* <button className='button-secondary' onClick={() => { navigate("/login") }}>Login</button> */}
                        </form>


                    </div>
                </section>
            </div>
        </>
    )
}

export default Register;