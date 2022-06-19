import OrderConstants from "../constants/orderConstants";

export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case OrderConstants.CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case OrderConstants.CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case OrderConstants.CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case OrderConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const myOrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case OrderConstants.MY_ORDER_REQUEST:
            return {
                loading: true
            }
        case OrderConstants.MY_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case OrderConstants.MY_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case OrderConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

// ALL ORDERS FOR ADMIN
export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case OrderConstants.ALL_ORDERS_REQUEST:
            return {
                loading: true
            }
        case OrderConstants.ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                totalAmount: action.payload.totalAmount
            }
        case OrderConstants.ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case OrderConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

// Update order for admin
export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case OrderConstants.UPDATE_ORDER_REQUEST:
        case OrderConstants.DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case OrderConstants.UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success
            }
        case OrderConstants.DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success
            }
        case OrderConstants.UPDATE_ORDER_FAIL:
        case OrderConstants.DELETE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case OrderConstants.UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case OrderConstants.DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case OrderConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}



export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case OrderConstants.ORDER_DETAILS_REQUEST:
            return {
                loading: true
            }
        case OrderConstants.ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case OrderConstants.ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case OrderConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}