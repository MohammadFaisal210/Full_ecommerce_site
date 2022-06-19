import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getProduct, newReviewAction, clearErrors } from "../../redux/actions/productActions"
import Loading from "../utils/loader/Loading"
import { addItemsToCart } from "../../redux/actions/cartAction"
import { Rating } from "@material-ui/lab"
import ProductConstants from "../../redux/constants/productConstants";
import { Dialog, DialogActions, DialogContent, Button, DialogTitle } from "@material-ui/core"
import ReviewCard from "./ReviewCard"
import Carousel from "react-material-ui-carousel"

function DetailsPage() {
    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const params = useParams()
    const dispatch = useDispatch()

    const { product, loading, error } = useSelector(state => state.details)

    const { success, error: reviewError } = useSelector(state => state.newReview)

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5
    }

    const increment = () => {
        if (product.Stock <= quantity) return
        setQuantity(quantity + 1)
    }
    const decrement = () => {
        if (1 >= quantity) return
        setQuantity(quantity - 1)
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }

    const addTocartHandler = () => {
        dispatch(addItemsToCart(params.id, quantity))
        window.alert("Item added to Cart")
    }

    const submitReviewHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating)
        myForm.set("comment", comment)
        myForm.set("productId", params.id)

        dispatch(newReviewAction(myForm))
        setOpen(false)
    }
    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (reviewError) {
            window.alert(reviewError)
            dispatch(clearErrors())
        }
        if (success) {
            window.alert("Review submitted successfully")
            dispatch({ type: ProductConstants.NEW_REVIEW_RESET })
        }
        dispatch(getProduct(params.id))
    }, [params.id, dispatch, success, reviewError, error])
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="details">
                        <div className="container">
                            <div className="details_page">
                                <h1>Details Page</h1>
                                <div className="details_card">
                                    <div className="images_box">
                                        <Carousel>
                                            {
                                                product.images &&
                                                product.images.map((image) => (
                                                    <img className="product_images" src={image.url} key={image._id} alt="" />
                                                ))
                                            }
                                        </Carousel>
                                    </div>
                                    <div className="details_infor">
                                        <h4>{product.name}</h4>
                                        <h5>$ <span>{product.price}</span></h5>
                                        <div>
                                            <p>
                                                {product.description}
                                            </p>
                                        </div>
                                        <p>Status : <b style={{ color: `${product.Stock < 1 ? "red" : "green"}` }}>{product.Stock < 1 ? "Out of Stock" : "InStock"}</b></p>
                                        <Rating {...options} /> <span>{product.numOfReviews} reviews</span>
                                        <div className="cartInput">
                                            <button className="quantity" onClick={decrement}>-</button>
                                            <input type="text" value={quantity} readOnly />
                                            <button className="quantity" onClick={increment}>+</button>
                                        </div>
                                        <div className="details_button">
                                            <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                                            <button disabled={product.Stock < 1 ? true : false} onClick={addTocartHandler}>Add To Cart</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="reviews">
                                {product.reviews && product.reviews.length === 0 ? <h2>No Reviews </h2> : <h2>Product Reviews </h2>}

                                <Dialog
                                    aria-labelledby="simple-dialog-title"
                                    open={open}
                                    onClose={submitReviewToggle}
                                >
                                    <DialogTitle>Submit Review</DialogTitle>
                                    <DialogContent className="submitDialog">
                                        <Rating
                                            onChange={(e) => setRating(e.target.value)}
                                            value={rating}
                                            size="large"
                                        />
                                        <textarea className="submitDialogTextArea" name="" onChange={(e) => setComment(e.target.value)} id="" cols="30" rows="5"></textarea>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button color="secondary">Cancel</Button>
                                        <Button onClick={submitReviewHandler} color="primary">Submit</Button>
                                    </DialogActions>
                                </Dialog>

                                <div className="review_wrapper">
                                    {
                                        product.reviews && product.reviews.map((review) => (
                                            <ReviewCard className="reviews" key={review._id} review={review} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </>
    );
}

export default DetailsPage;
