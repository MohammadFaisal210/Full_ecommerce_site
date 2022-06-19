import CartConstants from "../constants/cartConstants";
import axios from "axios"

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/product/${id}`)

    dispatch({
        type: CartConstants.ADD_TO_CARD,
        payload: {
            product: data._id,
            name: data.name,
            price: data.price,
            image: data.images[0].url,
            stock: data.Stock,
            quantity
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

// REMOVE FROM CART ITEM

export const removeCartItem = (id) => async (dispatch, getState) => {
    dispatch({
        type: CartConstants.REMOVE_CART_ITEM,
        payload: id
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

// SAVE SHIPPING INFO
export const shippingAction = (data) => async (dispatch) => {
    dispatch({
        type: CartConstants.SAVE_SHIPPING_INFO,
        payload: data
    })
    localStorage.setItem("shippingInfo", JSON.stringify(data))
}