import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { FaShoppingCart, } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { VscClose } from 'react-icons/vsc';
import { useSelector, useDispatch } from "react-redux"
import { userLogOut } from "../../redux/actions/userActions"


export default function Header() {
    const [menu, setMenu] = useState(false)

    const { isAuthenticated, user } = useSelector(state => state.user)
    const { cartItems } = useSelector(state => state.cart)

    const dispatch = useDispatch()
    const togglemenu = () => {
        setMenu(!menu)
    }

    const adminNav = () => {
        if (user.role === "admin") {
            return (
                <li onClick={togglemenu}>
                    <Link to="/admin/dashboard">Dasboard</Link>
                </li>
            )
        }
    }

    const handleLog = () => {
        dispatch(userLogOut())
        localStorage.removeItem("firstLogin")
    }

    const logOut = () => {
        return (<>
            <li onClick={handleLog}><Link to="/">LogOut</Link></li>
        </>
        )
    }

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            <div className="header">
                <div className='bars' onClick={togglemenu}>
                    {
                        menu ? <VscClose /> : <GiHamburgerMenu />
                    }

                </div>
                <div className='logo'>
                    <h1> <Link to="/">Faisal</Link></h1>
                </div>
                <div className='menu'>
                    <ul style={styleMenu}>
                        <li onClick={togglemenu}>
                            <Link to="/">Home</Link>
                        </li>
                        <li onClick={togglemenu}>
                            <Link to="/products">products </Link>
                        </li>
                        <li onClick={togglemenu}>
                            <Link to="/contact">contact</Link>
                        </li>
                        <li onClick={togglemenu}>
                            <Link to="/about">about</Link>
                        </li>
                        {
                            isAuthenticated &&
                            adminNav()
                        }

                        {
                            isAuthenticated ? logOut() :
                                <li onClick={togglemenu}>
                                    <Link to="/login">Login</Link>
                                </li>
                        }
                    </ul>
                </div>
                {
                    isAuthenticated &&
                    <div className='nav_img'>
                        <Link to="/profile">
                            <img src={user.avatar.url} alt="Profile" />
                            <p>{user.name}</p>
                        </Link>
                    </div>
                }
                <div className='icons'>
                    <div className='cart'>
                        <Link to="/cart"><FaShoppingCart /></Link>
                        <span>{cartItems.length}</span>
                    </div>
                </div>
            </div>
        </header>
    )
}