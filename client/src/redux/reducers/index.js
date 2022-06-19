import { combineReducers } from "redux"
import { cartReducer } from "./cardReducer"

import { productSReducer, productReducer, productDetailsReducer, newReviewReducer, newProductReducer, deleteReviewReducer, getReviewSReducer } from "./productReducer"
import { userReducer, uploadAvatar, updateProfileReducer, forgotPasswordReducer, userDetailsReducer, allUsersReducer } from "./userReducer"
import { createOrderReducer, myOrderReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from "./orderReducer"

export default combineReducers({
    products: productSReducer,
    details: productDetailsReducer,
    product: productReducer,
    newProduct: newProductReducer,

    newReview: newReviewReducer,
    review: deleteReviewReducer,
    allReviews: getReviewSReducer,

    user: userReducer,
    uploadAvatar: uploadAvatar,
    profile: updateProfileReducer,
    forgotPassword: forgotPasswordReducer,
    userDetails: userDetailsReducer,
    allUsers: allUsersReducer,

    cart: cartReducer,

    newOrder: createOrderReducer,
    myOrders: myOrderReducer,
    orderDetails: orderDetailsReducer,
    allorder: allOrdersReducer,
    order: orderReducer,
})
