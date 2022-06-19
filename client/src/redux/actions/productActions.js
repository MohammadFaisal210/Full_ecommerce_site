import ProductConstants from "../constants/productConstants";
import axios from "axios"
export const getAllProduct = (search = "", currentPage = 1, price = [0, 2000], category = "", rating = 0) => async (dispatch) => {
    try {
        dispatch({
            type: ProductConstants.ALL_PRODUCT_REQUEST
        })
        const link = `/api/product?name[regex]=${search}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category[regex]=${category}&ratings[gte]=${rating}`
        const { data } = await axios.get(link)
        dispatch({
            type: ProductConstants.ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ProductConstants.ALL_PRODUCT_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const createProduct = (myForm) => async (dispatch) => {
    try {
        dispatch({
            type: ProductConstants.NEW_PRODUCT_REQUEST
        })
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.post("/api/product", myForm, config)
        dispatch({
            type: ProductConstants.NEW_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ProductConstants.NEW_PRODUCT_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: ProductConstants.ADMIN_PRODUCT_REQUEST
        })
        const { data } = await axios.get("/api/products/admin")
        dispatch({
            type: ProductConstants.ADMIN_PRODUCT_SUCCESS,
            payload: data.products
        })
    } catch (error) {
        dispatch({
            type: ProductConstants.ADMIN_PRODUCT_FAIL,
            payload: error.response.data.msg
        })
    }
}
// Product details
export const getProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ProductConstants.PRODUCT_DETAILS_REQUEST
        })
        const { data } = await axios.get(`/api/product/${id}`)
        dispatch({
            type: ProductConstants.PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ProductConstants.PRODUCT_DETAILS_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ProductConstants.DELETE_PRODUCT_REQUEST
        })
        const { data } = await axios.delete(`/api/product/${id}`)
        dispatch({
            type: ProductConstants.DELETE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ProductConstants.DELETE_PRODUCT_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const updateProduct = (id, formData) => async (dispatch) => {
    try {
        dispatch({
            type: ProductConstants.UPDATE_PRODUCT_REQUEST
        })
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.put(`/api/product/${id}`, formData, config)
        dispatch({
            type: ProductConstants.UPDATE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ProductConstants.UPDATE_PRODUCT_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const newReviewAction = (reviewData) => async (dispatch) => {
    try {
        dispatch({
            type: ProductConstants.NEW_REVIEW_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put("/api/products/reviews", reviewData, config)
        dispatch({
            type: ProductConstants.NEW_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: ProductConstants.NEW_REVIEW_FAIL,
            payload: error.response.data.msg
        })
    }
}

// get reviews of a product
export const getReviewsAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ProductConstants.ALL_REVIEWS_REQUEST
        })
        const { data } = await axios.get(`/api/products/reviews?id=${id}`)
        dispatch({
            type: ProductConstants.ALL_REVIEWS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ProductConstants.ALL_REVIEWS_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const deleteRvwAction = (id, productId) => async (dispatch) => {
    try {
        dispatch({
            type: ProductConstants.DELETE_REVIEW_REQUEST
        })
        console.log(id, productId)
        const { data } = await axios.delete(`/api/products/reviews?id=${id}&productId=${productId}`)
        dispatch({
            type: ProductConstants.DELETE_REVIEW_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ProductConstants.DELETE_REVIEW_FAIL,
            payload: error.response.data.msg
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: ProductConstants.CLEAR_ERRORS
    })
}