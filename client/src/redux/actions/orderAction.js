import OrderConstants from "../constants/orderConstants"
import axios from "axios"

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({
            type: OrderConstants.CREATE_ORDER_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.post("/api/order/create", order, config)
        dispatch({
            type: OrderConstants.CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: OrderConstants.CREATE_ORDER_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const myOrdersAction = () => async (dispatch) => {
    try {
        dispatch({
            type: OrderConstants.MY_ORDER_REQUEST
        })

        const { data } = await axios.get("/api/order/me")
        dispatch({
            type: OrderConstants.MY_ORDER_SUCCESS,
            payload: data.order
        })
    } catch (error) {
        dispatch({
            type: OrderConstants.MY_ORDER_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const orderDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: OrderConstants.ORDER_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/order/getOrder/${id}`)
        dispatch({
            type: OrderConstants.ORDER_DETAILS_SUCCESS,
            payload: data.order
        })
    } catch (error) {
        dispatch({
            type: OrderConstants.ORDER_DETAILS_FAIL,
            payload: error.response.data.msg
        })
    }
}
// All order for admin
export const getOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: OrderConstants.ALL_ORDERS_REQUEST
        })

        const { data } = await axios.get("/api/all_orders")
        dispatch({
            type: OrderConstants.ALL_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: OrderConstants.ALL_ORDERS_FAIL,
            payload: error.response.data.msg
        })
    }
}
// update order for admin
export const updateOrder = (id, myForm) => async (dispatch) => {
    try {
        dispatch({
            type: OrderConstants.UPDATE_ORDER_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.put(`/api/order/update_order/${id}`, myForm, config)
        dispatch({
            type: OrderConstants.UPDATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: OrderConstants.UPDATE_ORDER_FAIL,
            payload: error.response.data.msg
        })
    }
}

// Delete order for admin
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({
            type: OrderConstants.DELETE_ORDER_REQUEST
        })

        const { data } = await axios.delete(`/api/order/delete_order/${id}`)
        dispatch({
            type: OrderConstants.DELETE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: OrderConstants.DELETE_ORDER_FAIL,
            payload: error.response.data.msg
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: OrderConstants.CLEAR_ERRORS
    })
}