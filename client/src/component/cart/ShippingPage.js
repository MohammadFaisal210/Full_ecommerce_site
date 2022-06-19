import React, { useState } from 'react'
import { MdPinDrop, MdLocationCity } from 'react-icons/md';
import { FaHome } from "react-icons/fa"
import { FiPhone } from "react-icons/fi"
import { Country, State } from "country-state-city"
import { shippingAction } from "../../redux/actions/cartAction"
import { useSelector, useDispatch } from "react-redux"
import CheckoutSteps from './CheckoutSteps';

function ShippingPage({ history }) {
    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [phone, setPhone] = useState(shippingInfo.phone)
    const [country, setCountry] = useState(shippingInfo.country)
    const [state, setState] = useState(shippingInfo.state)

    const dispatch = useDispatch()


    const handleSubmit = (e) => {
        e.preventDefault()

        if (phone.length < 11 || phone.length > 11) {
            window.alert("Phone number should be 11 digits long")
            return
        }
        dispatch(shippingAction({ address, city, pinCode, phone, country, state }))
        history.push("/order/confirm")
    }
    return (
        <>
            <div className="login_page">
                <div className="container">
                    <CheckoutSteps activeStep={0} />
                    <div className="login_wrapper">
                        <h1>Shipping information</h1>
                        <form onSubmit={handleSubmit} className="login_form" encType="multipart/form-data">
                            <div>
                                <label htmlFor="address">Address :</label>
                                <div>
                                    <FaHome />
                                    <input type="text" value={address} name="address" placeholder="Address" onChange={(e) => setAddress(e.target.value)} required />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="city">City :</label>
                                <div>
                                    <MdLocationCity />
                                    <input type="text" value={city} name="city" placeholder="City" onChange={(e) => setCity(e.target.value)} required />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="code">Pin Code :</label>
                                <div>
                                    <MdPinDrop />
                                    <input type="text" value={pinCode} name="pinCode" placeholder="Pin Code" onChange={(e) => setPinCode(e.target.value)} required />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone">Phone Number</label>
                                <div>
                                    <FiPhone />
                                    <input type="Number" size="11" value={phone} name="phone" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} required />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="country">Country</label>
                                <div>
                                    <select required value={country} name="country" onChange={(e) => setCountry(e.target.value)} id="">
                                        <option value="">Country</option>
                                        {
                                            Country &&
                                            Country.getAllCountries().map((item) => (
                                                <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            {
                                country && (
                                    <div>
                                        <label htmlFor="state">State</label>
                                        <div>
                                            <select name="state" id="" onChange={(e) => setState(e.target.value)} value={state}>
                                                <option value="">State</option>
                                                {
                                                    State &&
                                                    State.getStatesOfCountry(country).map((item) => (
                                                        <option value={item.isoCode} key={item.isoCode} >
                                                            {item.name}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="login_button">
                                <button type='submit' disabled={state ? false : true}>Continue</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShippingPage