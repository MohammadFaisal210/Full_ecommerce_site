import React from 'react'
import Slider from "@material-ui/core/Slider"
import Typography from '@material-ui/core/Typography'

function Filter({ setSearch, setPrice, search, price, categories, category, setCategory, rating, setRating }) {

    const handleChange = (e) => {
        setCategory(e.target.value)
        setSearch("")
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }
    return (
        <>
            <div className="filter_page">
                <div className="container">
                    <h3>Filter :</h3>
                    <div className="filter_Card">
                        <div className='search'>
                            <input type="text" placeholder='Please search products' value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div className="category_box">
                            <select name="category" id="" onChange={handleChange} value={category}>
                                <option value="">All products</option>
                                {
                                    categories.map((category) => (
                                        <option value={category} key={Math.random()}>{category}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="filter_price">
                            <Typography>Price :</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={2000}
                            />
                        </div>
                        <div className="rating_box">
                            <Typography>Rating Above</Typography>
                            <Slider
                                value={rating}
                                onChange={(e, newRating) => {
                                    setRating(newRating)
                                }}
                                valueLabelDisplay="auto"
                                aria-labelledby="continous-slider"
                                min={0}
                                max={5}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filter