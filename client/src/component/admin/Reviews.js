import React, { useEffect } from 'react'
import { useState } from 'react'
import Loading from '../utils/loader/Loading'
import { deleteRvwAction, getReviewsAction, clearErrors } from "../../redux/actions/productActions"
import { useDispatch, useSelector } from "react-redux"
import SlideBar from "./SlideBar"
import ProductConstants from '../../redux/constants/productConstants'
import { MdDelete } from 'react-icons/md';


function Reviews({ history }) {
    const [productId, setProductId] = useState("")
    const dispatch = useDispatch()
    const { reviews, loading, error } = useSelector(state => state.allReviews)
    const { error: deleteError, isDeleted } = useSelector(state => state.review)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getReviewsAction(productId))
    }

    const deleteHandle = (id) => {
        dispatch(deleteRvwAction(id, productId))
    }

    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (deleteError) {
            window.alert(deleteError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            window.alert("Reviews deleted successfully")
            history.push("/admin/reviews")
            dispatch({ type: ProductConstants.DELETE_REVIEW_RESET })
        }
    }, [deleteError, error, history, dispatch, isDeleted])

    return (
        <div className="admin_products">
            <SlideBar />
            <div className="admin_products_wrapper">
                <div className="login_wrapper">
                    <h1>Reviews</h1>
                    <form onSubmit={handleSubmit} className="login_form">
                        <div>
                            <label htmlFor="id">Product ID :</label>
                            <div>
                                <input type="text" value={productId} placeholder="Product Id" name="productId" onChange={(e) => setProductId(e.target.value)} required />
                            </div>
                        </div>

                        <div className="login_button">
                            <button disabled={loading ? true : false || productId === "" ? true : false} type='submit'>Search</button>
                        </div>
                    </form>
                </div>
                <div>
                    <h1>{reviews && reviews.length === 0 ? "No reviews" : "All Reviews"}</h1>
                </div>
                {
                    reviews && reviews.length === 0 ? null :
                        (
                            <table className='products_table'>
                                <thead>
                                    <tr>
                                        <th>Review ID</th>
                                        <th>User</th>
                                        <th>Comment</th>
                                        <th>Rating</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reviews && reviews.map((review) => (
                                            <tr key={review._id}>
                                                <td><span>User ID :</span>{review._id}</td>
                                                <td><span>Name :</span> {review.name}</td>
                                                <td><span>Comment :</span> {review.comment}</td>
                                                <td><span>Rating :</span> {review.rating}</td>
                                                <td>
                                                    <span>Actions :</span>
                                                    <div className='product_action_btn'>
                                                        <p className='deleteBtn' onClick={() => deleteHandle(review._id)} ><MdDelete title="Delete" /></p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        )
                }
            </div>
        </div>

    )
}

export default Reviews