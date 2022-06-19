import UserConstants from "../constants/userConstants"
import axios from "axios"

export const userLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.LOGIN_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post("/user/login", { email, password }, config)

        dispatch({
            type: UserConstants.LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.LOGIN_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const userRegister = (name, email, password, url, public_id) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.REGISTER_REQUEST
        })

        const config = { headers: { "Content-Type": "multipart/form-data" } }

        const { data } = await axios.post("/user/register", { name, email, password, url, public_id }, config)

        dispatch({
            type: UserConstants.REGISTER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.REGISTER_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const userImage = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.AVATAR_REQUEST
        })

        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.post("/api/uplaod_avatar", formData, config)

        dispatch({
            type: UserConstants.AVATAR_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.AVATAR_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const getUser = () => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.LOAD_USER_REQUEST
        })
        const { data } = await axios.get("/user/get_user")
        dispatch({
            type: UserConstants.LOAD_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.LOAD_USER_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const userLogOut = () => async (dispatch) => {
    try {
        await axios.post("/user/logout")
        dispatch({
            type: UserConstants.LOGOUT_USER_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: UserConstants.LOGOUT_USER_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const profileAction = (userdata) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.UPDATE_PROFILE_REQUEST
        })
        const config = { headers: { "Content-Type": "multipart/form-data" } }

        const { data } = axios.patch("/user/update_user", userdata, config)
        dispatch({
            type: UserConstants.UPDATE_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.UPDATE_PROFILE_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const changePassword = (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.UPDATE_PASSWORD_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.patch("/user/update_password", { oldPassword, newPassword, confirmPassword }, config)

        dispatch({
            type: UserConstants.UPDATE_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.UPDATE_PASSWORD_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const forgotAction = (email) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.FORGOT_PASSWORD_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.post("/user/forgot_password", { email }, config)

        dispatch({
            type: UserConstants.FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: UserConstants.FORGOT_PASSWORD_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const resetAction = (password, token) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.RESET_PASSWORD_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }
        console.log({ token });

        const { data } = await axios.put(`/user/reset_password/${token}`, { password }, config)
        dispatch({
            type: UserConstants.RESET_PASSWORD_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UserConstants.RESET_PASSWORD_FAIL,
            payload: error.response.data.msg
        })
    }
}

// get all users for admin
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.ALL_USERS_REQUEST
        })

        const { data } = await axios.get("/user/get_all_users")

        dispatch({
            type: UserConstants.ALL_USERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.ALL_USERS_FAIL,
            payload: error.response.data.msg
        })
    }
}
// user Details for admin
export const userDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.USER_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/user/user_details/${id}`)

        dispatch({
            type: UserConstants.USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.USER_DETAILS_FAIL,
            payload: error.response.data.msg
        })
    }
}

// usee update role for admin

export const updateUserRole = (id, myform) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.USER_UPDATE_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.put(`/user/update_role/${id}`, myform, config)

        dispatch({
            type: UserConstants.USER_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.USER_UPDATE_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const deleteUserAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: UserConstants.USER_DELETE_REQUEST
        })

        const { data } = await axios.delete(`/user/delete_user/${id}`)

        dispatch({
            type: UserConstants.USER_DELETE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UserConstants.USER_DELETE_FAIL,
            payload: error.response.data.msg
        })
    }
}



export const clearErrors = () => (dispatch) => {
    dispatch({
        type: UserConstants.CLEAR_ERRORS
    })
}
