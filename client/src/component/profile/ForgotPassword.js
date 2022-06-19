import React, { useEffect, useState } from 'react'
import { MdOutlineMailOutline } from 'react-icons/md';
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import Loading from '../utils/loader/Loading';
import { forgotAction, clearErrors } from "../../redux/actions/userActions"

function ForgotPassword() {
    const [email, setEmail] = useState("")

    const dispatch = useDispatch()
    const history = useHistory()
    const { loading, error, message } = useSelector(state => state.forgotPassword)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(forgotAction(email))
    }


    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (message) {
            window.alert(message)
        }
    }, [error, dispatch, message])

    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="login_page">
                        <div className="container">
                            <div className="login_wrapper">
                                <h1>Forgot Password</h1>
                                <form onSubmit={handleSubmit} className="login_form">
                                    <div>
                                        <label htmlFor="email">Email :</label>
                                        <div>
                                            <MdOutlineMailOutline />
                                            <input type="email" value={email} placeholder="Enter your Email" name="email" onChange={(e) => setEmail(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div className="login_button">
                                        <button>Forgot Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default ForgotPassword