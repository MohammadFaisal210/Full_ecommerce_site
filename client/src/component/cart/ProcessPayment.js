import React, { useEffect, useRef } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { MdVpnKey } from 'react-icons/md';
import { BsCreditCard2FrontFill, BsFillCalendar2EventFill } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux"
import "./payment.css"
import { CardCvcElement, CardExpiryElement, CardNumberElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { clearErrors, createOrder } from "../../redux/actions/orderAction"
import axios from "axios"
import Loading from '../utils/loader/Loading';


function ProcessPayment({ history, stripeApiKey }) {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)
    const { error } = useSelector(state => state.newOrder)
    const payBtn = useRef(null)

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const order = {
        shippingInfor: shippingInfo,
        orderItems: cartItems,
        itemPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.charge,
        totalPrice: orderInfo.totalPrice
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const config = { headers: { "Content-Type": "application/json" } }

            const { data } = await axios.post("/api/process/payment", paymentData, config)

            const client_secret = data.client_secret

            if (!stripe || !elements) return

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country
                        }
                    }
                }
            })

            if (result.error) {
                payBtn.current.disabled = false
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfor = {
                        id: result.paymentIntent.status,
                        status: result.paymentIntent.status
                    }
                    dispatch(createOrder(order))
                    history.push("/success")
                } else {
                    window.alert("There's some issue while processing payment")
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            window.alert(error.response.data.msg)
        }
    }

    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors)
        }
    }, [error, dispatch])

    return (
        <>
            {
                stripeApiKey ?

                    <Loading />
                    :
                    <div className="payment_page">
                        <div className="container">
                            <CheckoutSteps activeStep={2} />
                            <div className="payment_card">
                                <h1>cart info</h1>
                                <form onSubmit={submitHandler}>
                                    <div>
                                        <BsCreditCard2FrontFill />
                                        <CardNumberElement className="paymentInput" />
                                    </div>
                                    <div>
                                        <BsFillCalendar2EventFill />
                                        <CardExpiryElement className='paymentInput' />
                                    </div>
                                    <div>
                                        <MdVpnKey />
                                        <CardCvcElement className='paymentInput' />
                                    </div>
                                    <div>
                                        <button ref={payBtn} type='submit' className='paymentBtn'>Payment ${orderInfo && orderInfo.totalPrice}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}

export default ProcessPayment