const router = require("express").Router()
const { auth } = require("../middleware/authentication")
const paymentCtrl = require("../controllers/paymentCtrl")


router.post("/process/payment", auth, paymentCtrl.processPayment)
router.get("/apiKey", auth, paymentCtrl.sendApiKey)


module.exports = router