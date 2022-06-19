import React, { useEffect, useState } from 'react'
import Navbar from './component/navbar/Navbar'
import { Switch, Route } from "react-router-dom"
import Login from './component/auth/Login'
import Registration from "./component/auth/Registration"
import UpdatePassword from './component/profile/UpdatePassword'
import DetailsPage from './component/products/DetailsPage'
import Profile from './component/profile/Profile'
import EditProfile from './component/profile/EditProfile'
import Products from './component/products/Products'
import store from "./redux/store"
import { getUser } from "./redux/actions/userActions"
import { useSelector } from "react-redux"
import ForgotPassword from './component/profile/ForgotPassword'
import ResetPassword from './component/profile/ResetPassword'
import Cart from './component/cart/Cart'
import ShippingPage from './component/cart/ShippingPage'
import ConfirmOrder from './component/cart/ConfirmOrder'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import SuccessPage from './component/cart/SuccessPage'
import axios from "axios"
import ProcessPayment from './component/cart/ProcessPayment'
import MyOrders from './component/cart/MyOrders'
import OrderDetails from './component/cart/OrderDetails'
import Dashbord from './component/admin/Dashbord'
import ProtectedRoute from './component/utils/ProtectedRoute'
import AdminProducts from './component/admin/AdminProducts'
import NewProduct from "./component/admin/NewProduct"
import UpdateProduct from "./component/admin/UpdateProduct"
import OrderList from "./component/admin/OrdersList"
import OrderProcess from './component/admin/OrderProcess'
import UsersList from './component/admin/UsersList'
import UpdateRole from './component/admin/UpdateRole'
import Reviews from './component/admin/Reviews'
import Footer from './component/footer/Footer'
import Notfound from './component/utils/NotFound'

function App({ history }) {

  const { isAuthenticated } = useSelector(state => state.user)

  const [stripeApiKey, setStripeApiKey] = useState()

  async function getApiKey() {
    const { data } = await axios.get("/api/apiKey")
    setStripeApiKey(data.apiKey)
  }

  useEffect(() => {
    if (localStorage.getItem("firstLogin")) {
      store.dispatch(getUser())
    }

    getApiKey()
  }, [])

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Products} />
        <Route path="/products" exact component={Products} />
        <Route path="/login" exact component={Login} />
        <Route path="/registration" exact component={Registration} />
        <Route path="/update_password" exact component={isAuthenticated && UpdatePassword} />
        <Route path="/product_details/:id" exact component={DetailsPage} />
        <Route path="/profile" exact component={isAuthenticated && Profile} />
        <Route path="/edit_profile" exact component={isAuthenticated && EditProfile} />
        <Route path="/forgot_password" exact component={ForgotPassword} />
        <Route path="/user/reset/:token" exact component={ResetPassword} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/shipping" exact component={isAuthenticated && ShippingPage} />
        <Route path="/order/confirm" exact component={isAuthenticated && ConfirmOrder} />
        <Route path="/success" exact component={isAuthenticated && SuccessPage} />
        <Route path="/orders" exact component={isAuthenticated && MyOrders} />
        <Route path="/orders/:id" exact component={isAuthenticated && OrderDetails} />
        <ProtectedRoute isAdmin={true} path="/admin/dashboard" exact component={Dashbord} />
        <ProtectedRoute isAdmin={true} path="/admin/products" exact component={AdminProducts} />
        <ProtectedRoute isAdmin={true} path="/admin/crteate" exact component={NewProduct} />
        <ProtectedRoute isAdmin={true} path="/admin/update/:id" exact component={UpdateProduct} />
        <ProtectedRoute isAdmin={true} path="/admin/orders" exact component={OrderList} />
        <ProtectedRoute isAdmin={true} path="/admin/order/:id" exact component={OrderProcess} />
        <ProtectedRoute isAdmin={true} path="/admin/users" exact component={UsersList} />
        <ProtectedRoute isAdmin={true} path="/admin/user/:id" exact component={UpdateRole} />
        <ProtectedRoute isAdmin={true} path="/admin/reviews" exact component={Reviews} />


        {
          stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Route stripeApiKey={stripeApiKey} path="/process/payment" exact component={isAuthenticated && ProcessPayment} />
            </Elements>
          )
        }
        <Route component={window.location.pathname === "/process/payment" ? null : Notfound} />
      </Switch>
      <Footer />
    </>
  )
}

export default App