const router = require("express").Router()
const userCtrl = require("../controllers/userCtrl")
const { auth, authAdmin } = require("../middleware/authentication")
// const { uploadImage } = require("../middleware/uploadImage")
router.post("/register", userCtrl.register)
router.post("/login", userCtrl.login)
router.post("/logout", userCtrl.logout)
router.post("/forgot_password", userCtrl.forgotPassword)
router.put("/reset_password/:token", userCtrl.resetPassword)
router.get("/get_user", auth, userCtrl.getUser)
router.get("/get_all_users", auth, authAdmin, userCtrl.getAllUsers)
router.patch("/update_user", auth, userCtrl.updateUser)
router.patch("/update_password", auth, userCtrl.updatePassword)

router.put("/update_role/:id", auth, authAdmin, userCtrl.updateUserRole)
router.delete("/delete_user/:id", auth, authAdmin, userCtrl.deleteUser)
router.get("/user_details/:id", auth, authAdmin, userCtrl.userDetails)

module.exports = router;