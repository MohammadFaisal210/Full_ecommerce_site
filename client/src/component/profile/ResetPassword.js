import React, { useEffect, useState } from 'react'
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineEye } from 'react-icons/ai';
import { BsEyeSlash } from 'react-icons/bs';
import { HiLockOpen } from 'react-icons/hi';
import { resetAction, clearErrors } from "../../redux/actions/userActions"
import { useDispatch, useSelector } from "react-redux"
import Loading from '../utils/loader/Loading';
import { useParams } from "react-router-dom"

const initialState = {
    password: "",
    confirmPassword: ""
}

function ResetPassword({ history }) {
    const [data, setData] = useState(initialState)
    const [show, setShow] = useState(false)
    const [cf_show, cf_setShow] = useState(false)

    const { password, confirmPassword } = data;

    const dispatch = useDispatch()
    const { error, loading, success } = useSelector(state => state.forgotPassword)

    const params = useParams()
    const token = params.token
    console.log(token);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!(password === confirmPassword)) {
            window.alert("Password does not match")
        }
        dispatch(resetAction(password, token))
    }

    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (success) {
            window.alert("Your password reset successfully")
            history.push("/login")
        }
    }, [error, success, dispatch, history])
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="login_page">
                        <div className="container">
                            <div className="login_wrapper">
                                <h1>Reset Password</h1>
                                <form onSubmit={handleSubmit} className="login_form">
                                    <div>
                                        <label htmlFor="password">New Password :</label>
                                        <div>
                                            <HiLockOpen />
                                            <input type={show ? "password" : "text"} value={password} name="password" placeholder="Enter your new Password" onChange={handleChange} required />
                                            <p onClick={() => setShow(!show)}>
                                                {show ? <AiOutlineEye /> : <BsEyeSlash />}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword">confirm Password :</label>
                                        <div>
                                            <RiLockPasswordLine />
                                            <input type={cf_show ? "password" : "text"} value={confirmPassword} name="confirmPassword" placeholder="Enter your confirm Password" onChange={handleChange} required />
                                            <p onClick={() => cf_setShow(!cf_show)}>
                                                {cf_show ? <AiOutlineEye /> : <BsEyeSlash />}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="login_button">
                                        <button>Reset Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default ResetPassword;