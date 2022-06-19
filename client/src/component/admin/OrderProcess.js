import React, { useEffect } from 'react'
import SlideBar from './SlideBar'
import { useDispatch, useSelector } from "react-redux"
import { orderDetails, clearErrors, updateOrder } from "../../redux/actions/orderAction"
import OrderConstants from '../../redux/constants/orderConstants'
import { useParams } from "react-router-dom"
import Loading from '../utils/loader/Loading'
import "./orderprocess.css"
import { useState } from 'react'

function OrderProcess({ history }) {
    const [status, setStatus] = useState("")
    const dispatch = useDispatch()
    const params = useParams()
    const { user } = useSelector(state => state.user)
    const { order, loading, error } = useSelector(state => state.orderDetails)
    const { isUpdated, error: updateError } = useSelector(state => state.order)
    const id = params.id

    const handleSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("status", status)
        dispatch(updateOrder(id, myForm))
    }

    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (updateError) {
            window.alert(updateError)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            window.alert("Order status updated successfully")
            history.push("/admin/orders")
            dispatch({
                type: OrderConstants.UPDATE_ORDER_RESET
            })
        }
        dispatch(orderDetails(id))
    }, [dispatch, id, updateError, error, history, isUpdated])
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="order_process">
                        <SlideBar />
                        <div className="order_wrapper">
                            <div className="order_details">
                                <div>
                                    <h4>Name : </h4>
                                    <p>{user && user.name}</p>
                                </div>
                                <div>
                                    <h4>Phone : </h4>
                                    <p>{order.shippingInfor && order.shippingInfor.phone}</p>
                                </div>
                                <div>
                                    <h4>Address:</h4>
                                    <p>{order.shippingInfor && order.shippingInfor.address}</p>
                                </div>
                                <div>
                                    <h4>Payment</h4>
                                    <p>{order.paymentInfor && order.paymentInfor.status === "succeeded" ? "Paid" : "NotPaid"}</p>
                                </div>
                                <div>
                                    <h4>Status</h4>
                                    <p>{order && order.orderStatus}</p>
                                </div>
                                <div>
                                    <h4>Total Amount</h4>
                                    <p>{order && order.totalPrice}</p>
                                </div>
                            </div>
                            <div className="order_cart_admin">
                                {
                                    order.orderItems &&
                                    order.orderItems.map((item) => (
                                        <div key={item._id} className="order_items_details">
                                            <img src={item.image} alt="Item" />
                                            <p>{item.price} X {item.quantity} = {item.price * item.quantity}</p>
                                        </div>
                                    ))
                                }

                            </div>
                            <form className='processForm' onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="process">Product Process</label>
                                    <select onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">Choose Category</option>
                                        {
                                            order.orderStatus === "Processing" && (
                                                <option value="Shipped">Shipped</option>
                                            )
                                        }
                                        {
                                            order.orderStatus === "Shipped" && (
                                                <option value="Delivered">Delivered</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div>
                                    <button type='submit' disabled={loading ? true : false || status === "" ? true : false}>Process</button>
                                </div>
                            </form>
                        </div>
                    </div>
            }
        </>
    )
}

export default OrderProcess