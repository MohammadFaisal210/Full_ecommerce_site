const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name"],
        trim: true,
        maxlength: 15
    },
    description: {
        type: String,
        required: [true, "description"],
        trim: true,
        maxlength: 300
    },
    price: {
        type: Number,
        required: [true, "price"]
    },
    discountPrice: {
        type: Number
    },
    color: {
        type: String
    },
    size: {
        type: String
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: true,
        trim: true,
        maxlength: 15
    },
    Stock: {
        type: Number,
        required: [true, "Please add some stock for your product"],
        maxlength: [3, "Stock can not exceed than 3 characters"]
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: true
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "Users",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true,
                default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOIw4i6nMOAcPikeIiDjYw7oedVyJaiqYSqPFvpFJ1t6G_I2_T1rzWLjtv4tBp8sU0A0I&usqp=CAU"
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String
            },
            time: {
                type: Date,
                default: Date.now()
            }
        }
    ],
}, {
    timestamps: true
})

module.exports = mongoose.model("Products", productSchema)
