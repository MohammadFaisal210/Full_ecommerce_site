import ProductConstants from "../constants/productConstants";

export const productSReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ProductConstants.ALL_PRODUCT_REQUEST:
        case ProductConstants.ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                product: []
            }
        case ProductConstants.ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                result: action.payload.result,
                resultPerPage: action.payload.resultPerPage
            }
        case ProductConstants.ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case ProductConstants.ALL_PRODUCT_FAIL:
        case ProductConstants.ADMIN_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ProductConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case ProductConstants.DELETE_PRODUCT_REQUEST:
        case ProductConstants.UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ProductConstants.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success
            }
        case ProductConstants.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success
            }
        case ProductConstants.DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case ProductConstants.UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case ProductConstants.DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ProductConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case ProductConstants.NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ProductConstants.NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload.product,
                success: action.payload.success
            }
        case ProductConstants.NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false
            }
        case ProductConstants.NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ProductConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case ProductConstants.PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ProductConstants.PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case ProductConstants.PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ProductConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case ProductConstants.NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ProductConstants.NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }
        case ProductConstants.NEW_REVIEW_FAIL:
            return {
                ...state,
                loadding: false,
                error: action.payload
            }
        case ProductConstants.NEW_REVIEW_RESET:
            return {
                ...state,
                success: false,
            }
        case ProductConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const getReviewSReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case ProductConstants.ALL_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ProductConstants.ALL_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload.reviews
            }
        case ProductConstants.ALL_REVIEWS_FAIL:
            return {
                ...state,
                loadding: false,
                error: action.payload
            }
        case ProductConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const deleteReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case ProductConstants.DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ProductConstants.DELETE_REVIEW_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload.success
            }
        case ProductConstants.DELETE_REVIEW_FAIL:
            return {
                ...state,
                loadding: false,
                error: action.payload
            }
        case ProductConstants.DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case ProductConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}
