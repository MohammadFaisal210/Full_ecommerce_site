import React, { useEffect } from 'react'
import SlideBar from './SlideBar'
import { Link } from "react-router-dom"
import { Doughnut, Line } from "react-chartjs-2"
import { getAdminProducts } from "../../redux/actions/productActions"
import { getOrders } from "../../redux/actions/orderAction"
import { getAllUsers } from "../../redux/actions/userActions"


import { useDispatch, useSelector } from "react-redux"

function Dashbord() {
    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { error, loading, totalAmount, orders } = useSelector(state => state.allorder)


    const dispatch = useDispatch()


    let outOfStock = 0;

    products &&
        products.forEach((item) => {
            if (item.Stock === 0) {
                outOfStock += 1
            }
        })



    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197,72,49)"],
                data: [0, 4000]
            },
        ],
    };
    const doughnutState = {
        labels: ["Out of Stock", "LnStock"],
        datasets: [
            {
                backgroundColor: ["#00A684", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products && products.length - outOfStock]
            }
        ]
    }
    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(getOrders())
        dispatch(getAllUsers())
    }, [dispatch])
    return (
        <>
            <div className="container">
                <div>
                    <h1>Dashboard</h1>
                </div>
            </div>
            <div className="dashbord_page">
                <SlideBar />
                <div className="dashboard_container">
                    <div className="dashboard_menu">
                        <div className='all_amount'>
                            <p>Total Amount :</p>
                            <p><span>$</span> {totalAmount && totalAmount}</p>
                        </div>
                        <div className='admin_count'>
                            <div>
                                <Link to="/admin/products">
                                    <p>products</p>
                                    <p>{products && products.length}</p>
                                </Link>
                            </div>
                            <div>
                                <Link to="/admin/users">
                                    <p>users</p>
                                    <p>{users && users.length}</p>
                                </Link>
                            </div>
                            <div>
                                <Link to="/admin/orders">
                                    <p>orders</p>
                                    <p>{orders && orders.length}</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="chart">
                        <div className="line_chart">
                            <Line data={lineState} />
                        </div>
                        <div className="doughnutChart">
                            <Doughnut data={doughnutState} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashbord