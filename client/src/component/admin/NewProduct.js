import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { createProduct, clearErrors } from "../../redux/actions/productActions"
import SlideBar from "./SlideBar"
import ProductConstants from '../../redux/constants/productConstants'

function NewProduct({ history }) {
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [Stock, setStock] = useState(0)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const categories = [
        "fruits",
        "animal",
        "laptop",
        "clock",
        "Driks"
    ];

    const dispatch = useDispatch()
    const { loading, error, success } = useSelector(state => state.newProduct)

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
        dispatch(createProduct(myForm))
    }

    const handleimagesChange = (e) => {
        const files = Array.from(e.target.files)
        setImages([]);
        setImagesPreview([]);

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


    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (success) {
            window.alert("Created product successfully")
            history.push("/admin/dashboard")
            dispatch({ type: ProductConstants.NEW_PRODUCT_RESET })
        }
    }, [error, success, history, dispatch])

    return (
        <>
            <div className="new_product_section">
                <SlideBar />
                <div className="create_product">
                    <div className='new_product'>
                        <h1>Create product page</h1>
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
                                            categories.map((cate) => (
                                                <option value={cate} key={Math.random()}>
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
                                    imagesPreview && imagesPreview.map((image, index) => (
                                        <img key={index} src={image} alt="Product" />
                                    ))
                                }
                            </div>
                            <div className="create_product_btn">
                                <button type='submit'>New Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewProduct