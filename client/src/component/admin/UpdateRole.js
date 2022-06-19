import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Loading from '../utils/loader/Loading'
import { updateUserRole, clearErrors, userDetails } from "../../redux/actions/userActions"
import UserConstants from '../../redux/constants/userConstants'
import SlideBar from './SlideBar'

function UpdateRole() {
    const [role, setRole] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const dispatch = useDispatch()
    const params = useParams()
    const history = useHistory()
    const id = params.id
    const { error, isUpdated, loading: updateLoading } = useSelector(state => state.profile)
    const { error: detailsError, user, loading } = useSelector(state => state.userDetails)

    const handleSubmit = (e) => {
        e.preventDefault()
        const myform = new FormData()
        myform.set("role", role)
        dispatch(updateUserRole(id, myform))
    }

    useEffect(() => {
        if (user && user._id !== id) {
            dispatch(userDetails(id))
        } else {
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (detailsError) {
            window.alert(detailsError)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            window.alert("User role updated")
            history.push("/admin/users")
            dispatch({ type: UserConstants.USER_UPDATE_RESET })
        }

    }, [error, history, dispatch, isUpdated, id, user, detailsError])
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="new_product_section">
                        <SlideBar />
                        <div className="create_product">
                            <div className='new_product'>
                                <h1>User role update</h1>
                                <form encType='multipart/form-data' onSubmit={handleSubmit} className="new_product_form">
                                    <div>
                                        <label htmlFor="name">User Name :</label>
                                        <input type="text" id='create_product_input' value={name} placeholder="User name" name="name" disabled />
                                    </div>
                                    <div>
                                        <label htmlFor="email">User email :</label>
                                        <input type="email" id='create_product_input' value={email} placeholder="User email" name="email" disabled />
                                    </div>

                                    <div>
                                        <label htmlFor="role">User Role</label>
                                        <div>
                                            <select id='create_product_input' value={role} onChange={(e) => setRole(e.target.value)} name="role">
                                                <option value="">Choose Role</option>
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="create_product_btn">
                                        <button disabled={updateLoading ? true : false || role === "" ? true : false} type='submit'>Update Role</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default UpdateRole