const Users = require("../models/userModel")
const jwt = require("jsonwebtoken")

exports.auth = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) return res.status(400).json({ msg: "Invalid Authentication" })

        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await Users.findById(user.id)
        next()
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

exports.authAdmin = async (req, res, next) => {
    try {
        const user = await Users.findOne({ _id: req.user.id })
        if (user.role !== "admin") return res.status(400).json({ msg: "Admin resources access denied." })
        next()
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}