import React from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from "react-redux"
import "./order.css"
function ConfirmOrder({ history }) {

    const { user } = useSelector(state => state.user)
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const address = `${shippingInfo.address} ${shippingInfo.city} ${shippingInfo.state} ${shippingInfo.pinCode} ${shippingInfo.country}`

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)

    const charge = subtotal > 1000 ? 0 : 50

    const tax = Math.round(subtotal / 100 * 10);

    const totalPrice = Math.round(subtotal + tax + charge)

    const proceedToPayment = () => {
        const data = {
            subtotal,
            charge,
            tax,
            totalPrice
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data))
        history.push("/process/payment")
    }
    return (
        <>
            <div className="orderPage">
                <div className="container">
                    <CheckoutSteps activeStep={1} />
                    <div className="order_card">
                        <div className="order_left">
                            <div className='order_info'>
                                <h1>Shipping Information</h1>
                                <div>
                                    <h4>Name : </h4>
                                    <p>{user.name}</p>
                                </div>
                                <div>
                                    <h4>Phone : </h4>
                                    <p>{shippingInfo.phone}</p>
                                </div>
                                <div>
                                    <h4>Address:</h4>
                                    <p>{address}</p>
                                </div>
                            </div>
                            <h1>Your Cart Items :</h1>
                            <div className='order_items'>
                                {
                                    cartItems &&
                                    cartItems.map((item) => (
                                        <div key={item.product}>
                                            <div>
                                                <img src={item.image} alt="Item" />
                                                <p>{item.name}</p>
                                            </div>
                                            <p>{item.quantity} X {item.price} = ${item.quantity * item.price}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="order_right">
                            <h1>Order summary</h1>
                            <div>
                                <h4>Subtotal : </h4>
                                <p> $ {subtotal}</p>
                            </div>
                            <div>
                                <h4>Shipping Charge :</h4>
                                <p> $ {charge}</p>
                            </div>
                            <div>
                                <h4>GST :</h4>
                                <p> ${tax}</p>
                            </div>
                            <div>
                                <h4>Total</h4>
                                <p> $ {totalPrice}</p>
                            </div>
                            <div>
                                <button onClick={proceedToPayment}>Proceed payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmOrder