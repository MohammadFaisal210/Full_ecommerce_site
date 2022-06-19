import React from 'react'
import { Link } from "react-router-dom"
import { FaCheckCircle } from 'react-icons/fa';

function SuccessPage() {
    return (
        <>
            <div className='success_page'>
                <div className="container">
                    <div className="success_card">
                        <FaCheckCircle />
                        <p>Your order has been placed successfully</p>
                        <button><Link to="/orders" >view order</Link></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuccessPage