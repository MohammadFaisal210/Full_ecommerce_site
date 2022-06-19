import React, { useEffect, useState } from 'react'
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineEye } from 'react-icons/ai';
import { BsEyeSlash, BsKey } from 'react-icons/bs';
import { HiLockOpen } from 'react-icons/hi';
import { changePassword, clearErrors } from "../../redux/actions/userActions"
import { useDispatch, useSelector } from "react-redux"
import UserConstants from '../../redux/constants/userConstants';

const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
}

function UpdatePassword({ history }) {
    const [data, setData] = useState(initialState)
    const [oshow, osetShow] = useState(false)
    const [nshow, nsetShow] = useState(false)
    const [cshow, csetShow] = useState(false)
    const { oldPassword, newPassword, confirmPassword } = data;

    const dispatch = useDispatch()
    const { error, loading, isUpdated } = useSelector(state => state.profile)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(changePassword(oldPassword, newPassword, confirmPassword))
    }

    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            window.alert("Your password updated successfully")
            history.push("/profile")
            dispatch({
                type: UserConstants.UPDATE_PASSWORD_RESET
            })
        }
    }, [error, isUpdated, dispatch, history])
    return (
        <>
            <div className="login_page">
                <div className="container">
                    <div className="login_wrapper">
                        <h1>Password update</h1>
                        <form onSubmit={handleSubmit} className="login_form">
                            <div>
                                <label htmlFor="oldPassword">old Password :</label>
                                <div>
                                    <BsKey />
                                    <input type={oshow ? "password" : "text"} value={oldPassword} name="oldPassword" placeholder="Enter your old Password" onChange={handleChange} required />
                                    <p onClick={() => osetShow(!oshow)}>
                                        {oshow ? <AiOutlineEye /> : <BsEyeSlash />}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="newPassword">new Password :</label>
                                <div>
                                    <HiLockOpen />
                                    <input type={nshow ? "password" : "text"} value={newPassword} name="newPassword" placeholder="Enter your new Password" onChange={handleChange} required />
                                    <p onClick={() => nsetShow(!nshow)}>
                                        {nshow ? <AiOutlineEye /> : <BsEyeSlash />}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">confirm Password :</label>
                                <div>
                                    <RiLockPasswordLine />
                                    <input type={cshow ? "password" : "text"} value={confirmPassword} name="confirmPassword" placeholder="Enter your confirm Password" onChange={handleChange} required />
                                    <p onClick={() => csetShow(!cshow)}>
                                        {cshow ? <AiOutlineEye /> : <BsEyeSlash />}
                                    </p>
                                </div>
                            </div>
                            <div className="login_button">
                                <button>Update Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdatePassword;