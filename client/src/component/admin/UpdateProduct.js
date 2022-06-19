import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { updateProduct, getProduct, clearErrors } from "../../redux/actions/productActions"
import SlideBar from "./SlideBar"
import ProductConstants from '../../redux/constants/productConstants'
import { useParams } from "react-router-dom"

function UpdateProduct({ history }) {
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [Stock, setStock] = useState(0)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const [oldImages, setOldImages] = useState([])

    const categories = [
        "fruits",
        "animal",
        "laptop",
        "clock",
        "Driks"
    ];

    const dispatch = useDispatch()
    const params = useParams()
    const { loading, error, isUpdated } = useSelector(state => state.product)
    const { product, error: detailserror } = useSelector(state => state.details)


    const id = params.id

    const handleSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        images.forEach((image) => {
            myForm.append("images", image)
        })
        dispatch(updateProduct(id, myForm))
    }

    const handleimagesChange = (e) => {
        const files = Array.from(e.target.files)
        setImages([]);
        setImagesPreview([]);
        setOldImages([])

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((old) => [...old, reader.result])
                    setImagesPreview((old) => [...old, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }

    console.log(imagesPreview);



    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(getProduct(id))
        } else {
            setName(product.name)
            setPrice(product.price)
            setStock(product.Stock)
            setDescription(product.description)
            setCategory(product.category)
            setOldImages(product.images)
        }
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (detailserror) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            window.alert("Created product successfully")
            history.push("/admin/products")
            dispatch({ type: ProductConstants.UPDATE_PRODUCT_RESET })
        }
    }, [error, isUpdated, history, dispatch, detailserror, product, id])

    return (
        <>
            <div className="new_product_section">
                <SlideBar />
                <div className="create_product">
                    <div className='new_product'>
                        <h1>update product page</h1>
                        <form encType='multipart/form-data' onSubmit={handleSubmit} className="new_product_form">
                            <div>
                                <label htmlFor="name">Product Name :</label>
                                <input type="text" id='create_product_input' value={name} placeholder="Enter a product name" name="name" onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div>
                                <label htmlFor="price">price :</label>
                                <input type="number" id='create_product_input' value={price} placeholder="Product price" name="price" onChange={(e) => setPrice(e.target.value)} required />
                            </div>
                            <div>
                                <label htmlFor="stock">Stock :</label>
                                <input type="number" id='create_product_input' value={Stock} name="Stock" placeholder="Stock" onChange={(e) => setStock(e.target.value)} required />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <textarea name="" value={description} id="" cols="30" rows="5" placeholder='Product Description' onChange={(e) => setDescription(e.target.value)} ></textarea>
                            </div>
                            <div>
                                <label htmlFor="category">Category</label>
                                <div>
                                    <select id='create_product_input' onChange={(e) => setCategory(e.target.value)} name="category">
                                        <option value="">Category</option>
                                        {
                                            categories.map((cate, index) => (
                                                <option value={cate} key={index}>
                                                    {cate}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='avatar'>
                                <label htmlFor="images">Product Images :</label>
                                <span style={{ color: "red" }}>{loading && "Picture Loading...!"}</span>
                                <div>
                                    <input type="file" id='create_product_input' name="avatar" onChange={handleimagesChange} accept="image/*" multiple />
                                </div>
                            </div>
                            <div id='imagesShow'>
                                {
                                    oldImages && oldImages.map((image, index) => (
                                        <img key={index} src={image.url} alt="Product details" />
                                    ))
                                }
                                {
                                    imagesPreview && imagesPreview.map((image, index) => (
                                        <img key={index} src={image} alt="Product" />
                                    ))
                                }
                            </div>
                            <div className="create_product_btn">
                                <button disabled={loading ? true : false} type='submit'>update Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct