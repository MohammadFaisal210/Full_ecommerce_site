import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers, deleteUserAction, clearErrors } from "../../redux/actions/userActions"
import Loading from "../utils/loader/Loading"
import { Link } from "react-router-dom"
import SlideBar from './SlideBar'
import { useEffect } from 'react'
import { TiEdit } from 'react-icons/ti';
import { MdDelete } from 'react-icons/md';
import UserConstants from '../../redux/constants/userConstants'


function UsersList({ history }) {
    const { error, loading, users } = useSelector(state => state.allUsers)
    const { error: deleteerror, isDeleted } = useSelector(state => state.profile)

    const dispatch = useDispatch()

    const deleteHandle = (id) => {
        if (window.confirm("Are you sure delete this user ?")) {
            dispatch(deleteUserAction(id))
        }
    }

    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (deleteerror) {
            window.alert(deleteerror)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            window.alert("User deleted successfully!")
            history.push("/admin/orders")
            dispatch({ type: UserConstants.USER_DELETE_RESET })
        }
        dispatch(getAllUsers())
    }, [dispatch, error, isDeleted, history, deleteerror])
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="admin_products">
                        <SlideBar />
                        <div className="admin_products_wrapper">
                            <div>
                                <h1>All Users</h1>
                            </div>
                            <table className='products_table'>
                                <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users && users.map((user) => (
                                            <tr key={user._id}>
                                                <td><span>User ID :</span>{user._id}</td>
                                                <td><span>Name :</span> {user.name}</td>
                                                <td><span>Email :</span> {user.email}</td>
                                                <td className={user.role === "admin" ? "greenColor" : "redColor"}><span>Role :</span> {user.role}</td>
                                                <td>
                                                    <span>Actions :</span>
                                                    <div className='product_action_btn'>
                                                        <Link to={`/admin/user/${user._id}`}><TiEdit title="Edit" /></Link>
                                                        <p className='deleteBtn' onClick={() => deleteHandle(user._id)} ><MdDelete title="Delete" /></p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </>
    )
}

export default UsersList