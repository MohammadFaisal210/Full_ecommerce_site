const Order = require("../models/orderModel")
const Product = require("../models/productModel")

const orderCtrl = {
    createOrder: async (req, res) => {
        try {
            const { shippingInfor, orderItems, paymentInfor, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body

            const order = await Order.create({
                shippingInfor, orderItems, paymentInfor, itemPrice, taxPrice, shippingPrice, totalPrice, user: req.user._id, paidAt: Date.now()
            })
            res.status(200).json({ order })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getOrder: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id).populate("user", "name email")
            if (!order) return res.status(400).json({ msg: "Order is not found with this id" })
            res.status(200).json({ order })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    myOrders: async (req, res) => {
        try {
            const order = await Order.find({ user: req.user._id })
            if (!order) return res.status(400).json({ msg: "Order is not found with this id" })

            // if(order.length === 0) return res.status(400).json({msg:"you have no order"})
            res.status(200).json({ order })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find()

            let totalAmount = 0;
            orders.forEach((order) => {
                totalAmount += order.totalPrice
            })
            res.status(200).json({ totalAmount, orders })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateOrder: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id)
            if (!order) return res.status(400).json({ msg: "Order is not found with this id" })

            if (order.orderStatus === "Delivered") return res.status(400).json({ msg: "You have already delivered this order." })

            if (req.body.status === "Shipped") {
                order.orderItems.forEach(async (o) => {
                    await updateStock(o.product, o.quantity)
                })
            }

            order.orderStatus = req.body.status;

            if (req.body.status === "Delivered") {
                order.delieveredAt = Date.now()
            }
            await order.save({ validateBeforeSave: false })
            return res.status(200).json({ success: true, msg: "Update order" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteOrder: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id)
            if (!order) return res.status(400).json({ msg: "Order is not found with this id" })

            await order.remove()
            return res.status(200).json({ success: true, msg: "Delete order" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}
async function updateStock(id, quantity) {
    const product = await Product.findById(id)
    product.Stock -= quantity

    await product.save({ validateBeforeSave: false })
}
module.exports = orderCtrl