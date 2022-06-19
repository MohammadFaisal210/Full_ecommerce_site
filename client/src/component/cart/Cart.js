import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addItemsToCart, removeCartItem } from "../../redux/actions/cartAction"
import { AiOutlineCloseSquare } from 'react-icons/ai';


export default function Cart() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { cartItems } = useSelector(state => state.cart)

    const increaseQuantity = (id, quantiy, stock) => {
        const newQty = quantiy + 1;

        if (stock <= quantiy) return
        dispatch(addItemsToCart(id, newQty))
    }

    const decreasequantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) return
        dispatch(addItemsToCart(id, newQty))
    }

    const deleteCartItem = (id) => {
        window.alert("Remove to cart item successfully")
        dispatch(removeCartItem(id))
    }

    const checkOutHandler = () => {
        history.push("/login?redirect=shipping")
    }

    return (
        <>
            <div className="container">
                {
                    cartItems.length === 0 ? <div><h1>Empty cart</h1></div> :
                        <>
                            <div><h1>Your cart</h1></div>
                            <div className="cartContainer">
                                <div className="cartleft">
                                    {cartItems &&
                                        cartItems.map((item) => (
                                            <div key={item.product} className="cartProducts">
                                                <div className="cartProdut">
                                                    <div className="cartImg">
                                                        <img src={item.image} alt="" />
                                                    </div>
                                                    <div className="cartProdutInfo">
                                                        <div>
                                                            <p>Product Name : </p>
                                                            <span>{item.name}</span>
                                                        </div>
                                                        <div>
                                                            <p>Price : </p>
                                                            <span className="cartPrice"> ${item.price}</span>
                                                        </div>
                                                        <div className="cartInput">
                                                            <button className="quantity" onClick={() => decreasequantity(item.product, item.quantity)}>-</button>
                                                            <input type="number" value={item.quantity} readOnly />
                                                            <button className="quantity" onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                                        </div>

                                                        <div>
                                                            <p>total price : </p>
                                                            <span className="cartPrice">{`$ ${item.price * item.quantity
                                                                }`}</span>
                                                        </div>
                                                    </div>
                                                    <div className="removeCart" onClick={() => deleteCartItem(item.product)}>
                                                        <AiOutlineCloseSquare />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                <div className="rightCart">
                                    <div className="totalCart">
                                        <div>
                                            <h3>total price :</h3>
                                            <h4>{`$ ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</h4>
                                        </div>
                                        <div>
                                            <h3>total items :</h3>
                                            <h4>{cartItems.length} items</h4>
                                        </div>
                                        <div className="totalCartButton">
                                            <button onClick={checkOutHandler}>Check out</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </>
                }
            </div>
        </>
    );
}