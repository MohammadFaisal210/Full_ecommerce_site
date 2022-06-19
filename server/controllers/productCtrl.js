const Product = require("../models/productModel")
const Features = require("../utils/Features")
const cloudinary = require("cloudinary")
const productCtrl = {
    getAllProducts: async (req, res) => {
        try {
            const resultPerPage = 10
            const productsCount = await Product.countDocuments()

            const features = new Features(Product.find(), req.query).filtering().sorting().paginating(resultPerPage)

            let products = await features.query

            let result = products.length

            return res.status(201).json({ result, productsCount, products, resultPerPage })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAdminProducts: async (req, res) => {
        try {
            const products = await Product.find()
            return res.status(201).json({ products })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    createProduct: async (req, res) => {
        try {
            let images = []

            if (typeof req.body.images === "string") {
                images.push(req.body.images)
            } else {
                images = req.body.images
            }

            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products"
                });
                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.url
                })
            }
            req.body.images = imagesLinks
            req.body.user = req.user.id
            const product = await Product.create(req.body)
            return res.status(201).json({ success: true, product })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            let product = await Product.findById(req.params.id)
            if (!product) return res.status(400).json({ msg: "Product not found with this id" })

            let images = [];

            if (typeof req.body.images === "string") {
                images.push(req.body.images)
            } else {
                images = req.body.images
            }

            if (images !== undefined) {
                // Delete images from cloudinary
                for (let i = 0; i < images.length; i++) {
                    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
                }

                const imagesLinks = []

                for (let i = 0; i < images.length; i++) {
                    const result = await cloudinary.v2.uploader.upload(images[i], {
                        folder: "products"
                    })
                    imagesLinks.push({
                        public_id: result.public_id,
                        url: result.secure_url
                    })

                }
                req.body.images = imagesLinks
            }

            product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: false
            })
            return res.status(201).json({ success: true, msg: "Updated product" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            let product = await Product.findById(req.params.id)
            if (!product) return res.status(400).json({ msg: "Product not found with this id" })

            // Deleting images from cloudinary

            for (let i = 0; i < product.images.length; i++) {
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);

            }

            await product.remove(req.params.id)
            return res.status(201).json({ success: true, msg: "deleted successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createReviews: async (req, res) => {
        try {
            const { productId, comment, rating, } = req.body
            const review = {
                user: req.user.id,
                name: req.user.name,
                url: req.user.avatar.url,
                rating: Number(rating),
                comment
            }
            const product = await Product.findById(productId)
            if (!product) return res.status(400).json({ msg: "Product not found with this id" })


            const isReviewd = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())
            if (isReviewd) {
                product.reviews.forEach((rev) => {
                    if (rev.user.toString() === req.user._id.toString())
                        (rev.rating = rating),
                            (rev.comment = comment)
                })
            } else {
                product.reviews.push(review)
                product.numOfReviews = product.reviews.length
            }
            let avg = 0;
            product.reviews.forEach(rev => avg += rev.rating)

            product.ratings = avg / product.reviews.length
            await product.save()
            return res.status(200).json({ success: true, msg: "Reviews created" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getReviews: async (req, res) => {
        try {
            const product = await Product.findById(req.query.id)
            if (!product) return res.status(400).json({ msg: "Product not found with this id" })

            return res.status(200).json({ success: true, reviews: product.reviews })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteReview: async (req, res) => {
        try {
            const product = await Product.findById(req.query.productId)

            if (!product) return res.status(400).json({ msg: "Product not found with this id" })

            const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())

            let avg = 0;

            reviews.forEach((rev) => avg += rev.rating)

            let ratings = 0
            if (reviews.length === 0) {
                ratings = 0
            } else {
                ratings = avg / reviews.length
            }
            const numOfReviews = reviews.length

            await Product.findByIdAndUpdate(req.query.productId, { reviews, ratings, numOfReviews })
            return res.status(200).json({ success: true, msg: "Deleted reviews" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = productCtrl;