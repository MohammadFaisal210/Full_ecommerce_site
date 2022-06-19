import React, { useEffect } from 'react'
import Loading from "../utils/loader/Loading"
import { useDispatch, useSelector } from "react-redux"
import { myOrdersAction, clearErrors } from "../../redux/actions/orderAction"
import { DataGrid } from "@material-ui/data-grid"
import { Link } from "react-router-dom"
import { MdOutlineLaunch } from 'react-icons/md';
import "./myOrders.css"

function MyOrders() {
    const { orders, error, loading } = useSelector(state => state.myOrders)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log(orders);

    const rows = []
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.4,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor" : "redColor"
            }
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.2
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.3
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/orders/${params.getValue(params.id, "id")}`}> <MdOutlineLaunch /> </Link>
                )
            }
        }
    ]
    orders &&
        orders.forEach((item, index) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice
            })
        })
    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        dispatch(myOrdersAction())
    }, [dispatch, error])
    return (
        <>
            {
                loading ? <Loading /> :
                    (
                        <div className="order_view_page">
                            <div className="container">
                                <div className="myOrder_page">
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        pageSize={10}
                                        disableSelectionOnClick
                                        className='myOrdersTable'
                                        autoHeight
                                    />

                                    <p>{user.name}'s orders</p>
                                </div>
                            </div>
                        </div>
                    )
            }

        </>
    )
}

export default MyOrders