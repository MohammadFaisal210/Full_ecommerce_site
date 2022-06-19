import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineMailOutline } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import { BsEyeSlash } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { useSelector, useDispatch } from "react-redux"
import { userRegister, clearErrors, userImage } from "../../redux/actions/userActions"

import Loading from '../utils/loader/Loading';
import { useHistory } from "react-router-dom"

const initialState = {
    name: "",
    email: "",
    password: "",
    cf_password: "",
}

function Registration() {
    const [data, setData] = useState(initialState)
    const [show, setShow] = useState(false)

    const { name, email, password, cf_password } = data;
    const [avatar, setAvatar] = useState("https://as2.ftcdn.net/v2/jpg/01/18/03/35/1000_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg")

    const dispatch = useDispatch()
    const history = useHistory()
    const { url, error: errorImg, loading: imgLoading, public_id } = useSelector(state => state.uploadAvatar)


    const { error, isAuthenticated, loading } = useSelector(state => state.user)

    console.log(url);

    const handleChange = async (e) => {

        if (e.target.name === "avatar") {
            const file = e.target.files[0]
            let formData = new FormData()
            formData.append('file', file)

            dispatch(userImage(formData))

            setAvatar(url)

        } else {
            const { name, value } = e.target;
            setData({ ...data, [name]: value })
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!(password === cf_password)) {
            window.alert("Password does not match!")
        } else {
            dispatch(userRegister(name, email, password, url, public_id))
            localStorage.setItem("firstLogin", true)
        }
    }
    useEffect(() => {
        if (errorImg) {
            window.alert(errorImg)
            dispatch(clearErrors())
        }
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (isAuthenticated) {
            history.push("/profile")
        }
    }, [errorImg, error, dispatch, history, isAuthenticated])
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="login_page">
                        <div className="container">
                            <div className='login_wrapper'>
                                <h1>Registration form</h1>
                                <form encType='multipart/form-data' onSubmit={handleSubmit} className="login_form">
                                    <div>
                                        <label htmlFor="name">Full Name :</label>
                                        <div>
                                            <CgProfile />
                                            <input type="text" value={name} placeholder="Enter your name" name="name" onChange={handleChange} required />
                                        </div>
                                    </div>
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
                                    <div>
                                        <label htmlFor="cf_password">confirm Password :</label>
                                        <div>
                                            <RiLockPasswordLine />
                                            <input type={show ? "password" : "text"} value={cf_password} name="cf_password" placeholder="Enter your Confirm Password" onChange={handleChange} required />
                                            <p onClick={(e) => setShow(!show)}>
                                                {show ? <AiOutlineEye /> : <BsEyeSlash />}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='avatar'>
                                        <label htmlFor="avatar">profile picture :</label>
                                        <span style={{ color: "red" }}>{imgLoading ? "Picture Loading ... Please wait!" : null}</span>
                                        <div>
                                            <img src={url ? url : avatar} alt="profile" />
                                            <input type="file" name="avatar" onChange={handleChange} accept="image/*" />
                                        </div>
                                    </div>
                                    <div className="login_button">
                                        <button type='submit'>Registration</button>
                                        <Link to="/login">Register</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}

export default Registration