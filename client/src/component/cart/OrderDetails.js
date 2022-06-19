import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { orderDetails, clearErrors } from "../../redux/actions/orderAction"
import Loading from "../utils/loader/Loading"
function OrderDetails() {
    const { order, error, loading } = useSelector(state => state.orderDetails)
    const dispatch = useDispatch()
    const params = useParams()
    const id = params.id
    console.log(order)
    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        dispatch(orderDetails(id))
    }, [dispatch, error, id])
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="orderPage">
                        <div className="container">
                            <div className="order_card">
                                <div className="order_left">
                                    <div className='order_info'>
                                        <h4>Order-id:{order._id}</h4>
                                        <h3>Shipping Information</h3>
                                        <div>
                                            <h4>Name : </h4>
                                            <p>{order.user && order.user.name}</p>
                                        </div>
                                        <div>
                                            <h4>Phone : </h4>
                                            <p>{order.shippingInfor && order.shippingInfor.phone}</p>
                                        </div>
                                        <div>
                                            <h4>Address:</h4>
                                            <p>{order.shippingInfor && `${order.shippingInfor.address} ${order.shippingInfor.city} ${order.shippingInfor.state} ${order.shippingInfor.pinCode} ${order.shippingInfor.country}`}</p>
                                        </div>
                                        <h3>Payment</h3>
                                        <div>
                                            <h4 className={order.paymentInfor && order.paymentInfor.status === "succeeded" ? "greenColor" : "redColor"}>
                                                {order.paymentInfor && order.paymentInfor.status === "succeeded" ? "PAID" : "NOTPAID"}
                                            </h4>
                                        </div>
                                        <div>
                                            <h4>Amount</h4>
                                            <p>{order.totalPrice}</p>
                                        </div>
                                        <h3>Order status</h3>
                                        <div>
                                            <h4 className={order.orderStatus && order.orderStatus === "Delievered" ? "greenColor" : "redColor"}>{order.orderStatus}</h4>
                                        </div>
                                    </div>
                                    <h1>Your Cart Items :</h1>
                                    <div className='order_items'>
                                        {
                                            order.orderItems &&
                                            order.orderItems.map((item) => (
                                                <div key={item.product}>
                                                    <div>
                                                        <img src={item.image} alt="Item" />
                                                        <p>{item.name}</p>
                                                    </div>
                                                    <p>{item.quantity} X {item.price} = ${item.quantity * item.price}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default OrderDetails