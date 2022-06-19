const cloudinary = require("cloudinary")
const fs = require("fs")

uploadCtrl = {
    uploadAvatar: async (req, res) => {
        try {
            const file = req.files.file;
            cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: 'avatar', width: "400", height: "400", crop: "fill"
            }, async (err, result) => {
                if (err) throw err;
                removeTmp(file.tempFilePath)

                res.json({ url: result.secure_url, public_id: result.public_id, avatar: { url: result.secure_url, public_id: result.public_id } })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
    })
}

module.exports = uploadCtrl;