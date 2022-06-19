import React, { useEffect, useState } from 'react'
import { getAllProduct, clearErrors } from "../../redux/actions/productActions"
import { useDispatch, useSelector } from "react-redux"
import Loading from '../utils/loader/Loading'
import ProductItem from './ProductItem'
import Filter from '../utils/filter/Filter'
import Pagination from "react-js-pagination"


const categories = [
    "fruits",
    "animal",
    "laptop",
    "clock",
    "Driks"
]

function Products() {
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 2000])
    const [category, setCategory] = useState("")
    const [rating, setRating] = useState(0)

    const { products, error, loading, productsCount, resultPerPage, result, } = useSelector(state => state.products)

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const count = result
    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        dispatch(getAllProduct(search.toLowerCase(), currentPage, price, category, rating))
    }, [dispatch, search, currentPage, price, category, rating, error])
    return (
        <>
            <Filter rating={rating} setRating={setRating} category={category}
                setCategory={setCategory} categories={categories}
                price={price} setPrice={setPrice} setSearch={setSearch} search={search}
            />
            {
                loading ? <Loading /> :
                    <div className="product_page">
                        <div className="container">
                            <div>
                                <h1>Features products</h1>
                            </div>
                            <div className="products" >
                                {
                                    products.map((product) => (
                                        <ProductItem key={product._id} product={product} />
                                    ))
                                }
                            </div>
                            <div className="paginationBox">
                                {
                                    resultPerPage >= count && (
                                        <Pagination
                                            activePage={currentPage}
                                            itemsCountPerPage={resultPerPage}
                                            totalItemsCount={productsCount}
                                            onChange={setCurrentPageNo}
                                            nextPageText="Next"
                                            prevPageText="Prev"
                                            firstPageText="1st"
                                            lastPageText="Last"
                                            itemClass='page-item'
                                            linkClass='page-link'
                                            activeClass='pageItemActive'
                                            activeLinkClass='pageLinkActive'
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Products