import React from 'react'
import { Rating } from "@material-ui/lab"

function ReviewCard({ review }) {

    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
        size: "large"
    }
    return (
        <>
            <div className="review_card">
                <img src={review.url && review.url} alt="Profile" />
                <h4>{review.name}</h4>
                <p>{review.comment}</p>
                <Rating {...options} />
            </div>
        </>
    )
}

export default ReviewCard