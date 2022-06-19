import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getOrders, deleteOrder, clearErrors } from "../../redux/actions/orderAction"
import Loading from "../utils/loader/Loading"
import { Link } from "react-router-dom"
import SlideBar from './SlideBar'
import { useEffect } from 'react'
import { TiEdit } from 'react-icons/ti';
import { MdDelete } from 'react-icons/md';
import OrderConstants from '../../redux/constants/orderConstants'


function OrderList({ history }) {
    const { error, loading, orders } = useSelector(state => state.allorder)
    const { error: deleteerror, isDeleted } = useSelector(state => state.order)
    const dispatch = useDispatch()

    const deleteHandle = (id) => {
        if (window.confirm("Are you sure? delete this order")) {
            dispatch(deleteOrder(id))
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
            window.alert("Product deleted successfully!")
            history.push("/admin/orders")
            dispatch({ type: OrderConstants.DELETE_ORDER_RESET })
        }
        dispatch(getOrders())
    }, [dispatch, error, isDeleted, history, deleteerror])
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="admin_products">
                        <SlideBar />
                        <div className="admin_products_wrapper">
                            <div>
                                <h1>All Orders</h1>
                            </div>
                            <table className='products_table'>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Status</th>
                                        <th>Items Qty</th>
                                        <th>Amount</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders && orders.map((order) => (
                                            <tr key={order._id}>
                                                <td><span>Order ID :</span>{order._id}</td>
                                                <td><span>Status :</span> {order.orderStatus}</td>
                                                <td><span>Items Qty :</span> {order.orderItems.length}</td>
                                                <td><span>Amount :</span> {order.totalPrice}</td>
                                                <td>
                                                    <span>Actions :</span>
                                                    <div className='product_action_btn'>
                                                        <Link to={`/admin/order/${order._id}`}><TiEdit title="Edit" /></Link>
                                                        <p className='deleteBtn' onClick={() => deleteHandle(order._id)} ><MdDelete title="Delete" /></p>
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

export default OrderList