const router = require("express").Router()
const uploadCtrl = require("../controllers/uploadCtrl")
const uploadImage = require("../middleware/uploadImage")

router.post("/uplaod_avatar", uploadImage, uploadCtrl.uploadAvatar)


module.exports = router;