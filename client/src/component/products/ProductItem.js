import React from 'react'
import { Link } from "react-router-dom"
import { Rating } from "@material-ui/lab"
function ProductItem({ product }) {

    const options = {
        size: "large",
        value: product.ratings === 0 ? 0 : product.ratings,
        readOnly: true,
        precision: 0.5
    }
    return (
        <>
            <Link to={`/product_details/${product._id}`} className='productCard'>
                <img src={product.images[0].url} alt="products" />
                <div className="productInfo">
                    <p>{product.description}</p>
                    <h5>$ <span>{product.price}</span></h5>
                    <div className="stars">
                        <Rating {...options} /><p>{product.numOfReviews}reviews</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default ProductItem