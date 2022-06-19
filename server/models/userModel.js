const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: [3, "Name should be at least 4 characters long."],
        max: [15, "name can be maximum 15 characters. "]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOIw4i6nMOAcPikeIiDjYw7oedVyJaiqYSqPFvpFJ1t6G_I2_T1rzWLjtv4tBp8sU0A0I&usqp=CAU"
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)