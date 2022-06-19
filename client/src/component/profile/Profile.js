import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Loading from '../utils/loader/Loading'
import { getUser, clearErrors } from "../../redux/actions/userActions"

function Profile({ history }) {
    const { isAuthenticated, user, loading, error } = useSelector(state => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isAuthenticated === false) {
            history.push("/login")
        }
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }


    }, [history, isAuthenticated, error, dispatch])
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="profile_page">
                        <div className="container">
                            <div className="profile_card">
                                <h1>Profile</h1>
                                <div>
                                    <div className='profile_left'>
                                        <div>
                                            <img src={user.avatar.url} alt="Profile" />
                                        </div>
                                        <div>
                                            <button className='pro_edit_buutton'>
                                                <Link to="/edit_profile">Edit Profile</Link>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='profile_right'>
                                        <div>
                                            <h4>Name : </h4>
                                            <p>{user.name}</p>
                                        </div>
                                        <div>
                                            <h4>Email : </h4>
                                            <p>{user.email}</p>
                                        </div>
                                        <div>
                                            <h4>User : </h4>
                                            <p>{user.role}</p>
                                        </div>
                                        <div>
                                            <h4>Join in : </h4>
                                            <p>{String(user.createdAt).substr(0, 10)}</p>
                                        </div>
                                        <div>
                                            <h4>Updated profile : </h4>
                                            <p>{String(user.updatedAt).substr(0, 10)}</p>
                                        </div>
                                        <div className=''>
                                            <button className='pro_edit_buutton'>
                                                <Link to="/update_password">Change password</Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}

export default Profile