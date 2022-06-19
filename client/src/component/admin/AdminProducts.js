import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAdminProducts, clearErrors, deleteProduct } from "../../redux/actions/productActions"
import Loading from "../utils/loader/Loading"
import { Link } from "react-router-dom"
import SlideBar from './SlideBar'
import { useEffect } from 'react'
import { TiEdit } from 'react-icons/ti';
import { MdDelete } from 'react-icons/md';
import ProductConstants from '../../redux/constants/productConstants'


function AdminProducts({ history }) {
    const { error, loading, products } = useSelector(state => state.products)
    const { error: deleteerror, isDeleted } = useSelector(state => state.product)
    const dispatch = useDispatch()

    const deleteHandle = (id) => {
        if (window.confirm("If you want to this product delete ? ")) {
            dispatch(deleteProduct(id))
        }
    }
    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (deleteerror) {
            window.alert(deleteerror)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            window.alert("Product deleted successfully!")
            history.push("/admin/dashboard")
            dispatch({ type: ProductConstants.DELETE_PRODUCT_RESET })
        }
        dispatch(getAdminProducts())
    }, [dispatch, error, isDeleted, history, deleteerror])
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="admin_products">
                        <SlideBar />
                        <div className="admin_products_wrapper">
                            <div>
                                <h1>All Products</h1>
                            </div>
                            <table className='products_table'>
                                <thead>
                                    <tr>
                                        <th>Product ID</th>
                                        <th>Name</th>
                                        <th>Stock</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products && products.map((product) => (
                                            <tr key={product._id}>
                                                <td><span>Product ID :</span>{product._id}</td>
                                                <td><span>Name :</span> {product.name}</td>
                                                <td><span>Stock :</span> {product.Stock}</td>
                                                <td><span>Price :</span> {product.price}</td>
                                                <td>
                                                    <span>Actions :</span>
                                                    <div className='product_action_btn'>
                                                        <Link to={`/admin/update/${product._id}`}><TiEdit title="Edit" /></Link>
                                                        <p className='deleteBtn' onClick={() => deleteHandle(product._id)} ><MdDelete title="Delete" /></p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </>
    )
}

export default AdminProducts