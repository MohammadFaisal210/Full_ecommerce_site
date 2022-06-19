import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineMailOutline } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import { BsEyeSlash } from 'react-icons/bs';
import { useSelector, useDispatch } from "react-redux"
import { userLogin, clearErrors } from "../../redux/actions/userActions"
import Loading from '../utils/loader/Loading';
import { useHistory } from "react-router-dom"

const initialState = {
    email: "",
    password: "",
    err: '',
    success: ""
}

function Login({ location }) {
    const [data, setData] = useState(initialState)
    const [show, setShow] = useState(false)
    const { email, password } = data;

    const dispatch = useDispatch()
    const history = useHistory()
    const { loading, error, isAuthenticated } = useSelector(state => state.user)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userLogin(email, password))
        localStorage.setItem("firstLogin", true)
    }

    const redirect = location.search ? location.search.split("=")[1] : "/profile"

    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (isAuthenticated) {
            history.push(redirect)
        }
    }, [error, dispatch, isAuthenticated, history, redirect])

    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="login_page">
                        <div className="container">
                            <div className="login_wrapper">
                                <h1>Login form</h1>
                                <form onSubmit={handleSubmit} className="login_form">
                                    <div>
                                        <label htmlFor="email">Email :</label>
                                        <div>
                                            <MdOutlineMailOutline />
                                            <input type="email" value={email} placeholder="Enter your Email" name="email" onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password :</label>
                                        <div>
                                            <RiLockPasswordLine />
                                            <input type={show ? "password" : "text"} value={password} name="password" placeholder="Enter your Password" onChange={handleChange} required />
                                            <p onClick={(e) => setShow(!show)}>
                                                {show ? <AiOutlineEye /> : <BsEyeSlash />}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="login_button">
                                        <button type='submit'>Log in</button>
                                        <span>Don't have an account ? </span><Link to="/registration">Register</Link>
                                    </div>
                                    <p className='forgot_link'><Link to="/forgot_password">Forgot Password</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Login