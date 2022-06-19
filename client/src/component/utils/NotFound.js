import React from "react"
import { Link } from "react-router-dom"
export default function Notfound() {
    return (
        <div className="container">
            <div>
                <h1> 404 | Not Found</h1>
                <Link to="/">Home</Link>
            </div>
        </div>
    )
}