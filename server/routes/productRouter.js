const router = require("express").Router()
const productCtrl = require("../controllers/productCtrl")
const { auth, authAdmin } = require("../middleware/authentication")
router.route("/product")
    .get(productCtrl.getAllProducts)
    .post(auth, authAdmin, productCtrl.createProduct)

router.get("/product/:id", productCtrl.getProduct)
router.get("/products/admin", auth, authAdmin, productCtrl.getAdminProducts)

router.delete("/products/reviews", auth, productCtrl.deleteReview)
router.put("/products/reviews", auth, productCtrl.createReviews)
router.get("/products/reviews", auth, productCtrl.getReviews)

router.delete("/product/:id", auth, authAdmin, productCtrl.deleteProduct)
router.put("/product/:id", auth, authAdmin, productCtrl.updateProduct)


module.exports = router