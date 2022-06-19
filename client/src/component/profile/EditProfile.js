import React, { useEffect, useState } from 'react'
import { MdOutlineMailOutline } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { useDispatch, useSelector } from "react-redux"
import Loading from "../utils/loader/Loading"
import { userImage, getUser, profileAction, clearErrors } from "../../redux/actions/userActions"
import UserConstants from "../../redux/constants/userConstants"


function EditProfile({ history }) {
    const [name, setName] = useState("")

    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.user)

    const { error: imgError, loading: imgLoading, url, public_id } = useSelector(state => state.uploadAvatar)
    const { isUpdated, error } = useSelector(state => state.profile)


    const handleChange = (e) => {
        const file = e.target.files[0]
        let formData = new FormData()
        formData.append('file', file)

        dispatch(userImage(formData))

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const userdata = {
            name, url: url ? url : user.avatar.url, public_id: public_id ? public_id : user.avatar.public_id
        }
        dispatch(profileAction(userdata))
    }

    useEffect(() => {
        if (user) {
            setName(user.name)
        }
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (imgError) {
            window.alert(imgError)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            window.alert("Profile updated successfully")

            dispatch(getUser())

            history.push("/profile")

            dispatch({
                type: UserConstants.UPDATE_PROFILE_RESET
            })
        }
    }, [user, dispatch, isUpdated, history, error, imgError])




    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="login_page">
                        <div className="container">
                            <div className="login_wrapper">
                                <h1>Edit profile</h1>
                                <form encType='multipart/form-data' onSubmit={handleSubmit} className="login_form">
                                    <div>
                                        <label htmlFor="name">Full Name :</label>
                                        <div>
                                            <CgProfile />
                                            <input type="text" value={name} placeholder="Enter your name" name="name" onChange={(e) => setName(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email :</label>
                                        <div>
                                            <MdOutlineMailOutline />
                                            <input type="email" defaultValue={user.email} placeholder="Enter your Email" name="email" onChange={handleChange} disabled />
                                        </div>
                                    </div>
                                    <div className='avatar'>
                                        <label htmlFor="avatar">profile picture : <span style={{ color: "red" }}>{imgLoading && "Image Loading ..."}</span></label>
                                        <div>
                                            <img src={url && url ? url : user.avatar.url} alt="profile" />
                                            <input type="file" name="avatar" onChange={handleChange} accept="image/*" />
                                        </div>
                                    </div>
                                    <div className="login_button">
                                        <button type="submit">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default EditProfile