require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const mongoose = require("mongoose")
const cloudianry = require("cloudinary")

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

app.use("/user", require("./routes/userRouter"))
app.use("/api", require("./routes/productRouter"))
app.use("/api", require("./routes/orderRouter"))
app.use("/api", require("./routes/uploadRouter"))
app.use("/api", require("./routes/paymentRouter"))


cloudianry.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uri = process.env.MONGODB_URL

mongoose.connect(uri, (err) => {
    if (err) throw err;
    console.log("conneted to mongobd");
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port no ${port}`);
})

