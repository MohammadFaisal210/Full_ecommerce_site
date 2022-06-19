const router = require("express").Router()
const orderCtrl = require("../controllers/orderCtrl")
const { auth, authAdmin } = require("../middleware/authentication")

router.post("/order/create", auth, orderCtrl.createOrder)

router.get("/order/getOrder/:id", auth, orderCtrl.getOrder)

router.get("/order/me", auth, orderCtrl.myOrders)

router.get("/all_orders", auth, authAdmin, orderCtrl.getAllOrders)

router.put("/order/update_order/:id", auth, authAdmin, orderCtrl.updateOrder)

router.delete("/order/delete_order/:id", auth, authAdmin, orderCtrl.deleteOrder)



module.exports = router;