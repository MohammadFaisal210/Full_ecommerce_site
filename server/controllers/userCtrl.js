const Users = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")
const cloudinary = require("cloudinary")


const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const avatar = {
                url: req.body.url,
                public_id: req.body.public_id
            }
            if (!name || !email || !password) return res.status(400).json({ msg: "Please fill in all fields." })

            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid emails." })

            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "The email already exists." })

            if (password.length < 8) return res.status(400).json({ msg: "Password must be 8 chracters long." })

            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = await new Users({
                name, email, password: passwordHash, avatar
            })

            await newUser.save()

            const token = createAccessToken({ id: newUser._id })

            res.cookie('token', token, {
                httpOnly: true,
                expiresIn: new Date(
                    Date.now + 7 * 24 * 60 * 60 * 1000
                )
            })

            res.status(201).json({ token, user: newUser })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400).json({ msg: "Please fill in all fields." })

            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "User does not exist." })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Password does not match." })

            const token = createAccessToken({ id: user._id })
            res.cookie("token", token, {
                httpOnly: true,
                expiresIn: new Date(Date.now + 7 * 24 * 60 * 60 * 1000)
            })
            res.status(201).json({ user })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true
            })
            res.status(201).json({ msg: "Logout successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "Email does not exist." })
            const token = createResetPassword({ id: user._id })
            const url = `${process.env.CLIENT_URL}/user/reset/${token}`
            sendEmail(email, url, "Reset your password")
            res.status(201).json({ message: "Your password have reset,please check your email." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { password } = req.body;
            const passwordHash = await bcrypt.hash(password, 12)

            const token = req.params.token
            if (!token) return res.status(400).json({ msg: "Invalid Authentication" })

            console.log(token);

            const user = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN)
            if (!user) return res.status(400).json({ msg: "Invalid authentication" })

            await Users.findByIdAndUpdate({ _id: user.id }, {
                password: passwordHash
            })
            res.status(201).json({ success: true })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select("-password")
            if (!user) return res.status(400).json({ msg: "User does not exist." })
            return res.status(201).json({ user })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await Users.find().select("-password")
            return res.status(201).json({ users })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUser: async (req, res) => {
        try {

            const { name } = req.body
            const avatar = {
                url: req.body.url,
                public_id: req.body.public_id
            }

            if (req.body.url !== "" && req.body.public_id !== "") {
                const user = await Users.findById(req.user.id)

                const imageId = user.avatar.public_id;

                await cloudinary.v2.uploader.destroy(imageId)
            }

            await Users.findByIdAndUpdate({ _id: req.user.id }, { name, avatar })


            return res.status(201).json({ success: true, msg: "Updated profile successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updatePassword: async (req, res) => {
        try {
            const { oldPassword, newPassword, confirmPassword } = req.body;
            const user = await Users.findById(req.user.id)

            const isMatch = await bcrypt.compare(oldPassword, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Old password is incorrect." })

            if (newPassword !== confirmPassword) return res.status(400).json({ msg: "Password does not match." })

            const passwordHash = await bcrypt.hash(newPassword, 10)

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            })

            return res.status(201).json({ success: true, msg: "Updated password successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUserRole: async (req, res) => {
        try {
            const { role } = req.body
            await Users.findByIdAndUpdate({ _id: req.params.id }, {
                role
            })
            return res.status(201).json({ success: true, msg: "Updated successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    userDetails: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).select("-password")

            return res.status(201).json({ success: true, user })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id)
            if (!user) return res.status(400).json({ msg: "User does not exist with id." })

            const imageId = user.avatar.public_id;
            await cloudinary.v2.uploader.destroy(imageId)

            await user.remove()
            return res.status(201).json({ success: true, msg: "Updated successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

const validateEmail = (email) => {
    return email.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
    );
};


const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d"
    })
}
const createResetPassword = (payload) => {
    return jwt.sign(payload, process.env.RESET_PASSWORD_TOKEN, {
        expiresIn: "11m"
    })
}
module.exports = userCtrl;