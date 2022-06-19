import React, { useState } from 'react'
import { MdExpandMore, MdImportExport, MdOutlineDashboard, MdAdd, MdOutlinePostAdd, MdOutlinePeople, MdOutlineRateReview } from 'react-icons/md';
import { Link } from "react-router-dom"

const SlideBar = () => {
    const [drop, setDrop] = useState(false)
    const slideDrop = () => {
        setDrop(!drop)
    }
    return (
        <>
            <div className="admin_slide">
                <ul className="admin_silde_menu">
                    <li> <Link to="/dashboard"><MdOutlineDashboard /> <p>Dashboard</p></Link> </li>
                    <li className='product_flex' onClick={slideDrop} ><div><MdExpandMore /> <p>Products</p></div>
                        <ul style={{ display: drop ? "block" : "none" }} className='slid_drop'>
                            <li>
                                <Link to="/admin/products"><MdOutlinePostAdd /> <p>All</p></Link>
                            </li>
                            <li>
                                <Link to="/admin/crteate"><MdAdd /> <p>Create</p></Link>
                            </li>
                        </ul>
                    </li>
                    <li> <Link to="/admin/orders"><MdImportExport /> <p>Orders</p></Link> </li>
                    <li> <Link to="/admin/users"><MdOutlinePeople /> <p>Users</p></Link> </li>
                    <li> <Link to="/admin/reviews"><MdOutlineRateReview /> <p>Reviews</p></Link> </li>

                </ul>
            </div>
        </>
    )
}

export default SlideBar