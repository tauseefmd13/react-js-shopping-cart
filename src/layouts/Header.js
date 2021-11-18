import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { getToken, removeUserSession } from './../utils/Common';

const Header = (props) => {
    const history = useHistory();

    // handle click event of logout button
    const handleLogout = () => {
        const headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        };

        axios.get("http://localhost:8000/api/v1/logout", {headers: headers}
        ).then((response) => {
            console.log('Success',response);
            removeUserSession();
            props.setIsLoggedin(false);
            history.push('/');
        }).catch((error) => {
            console.log('Error',error);
        });
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        React Js
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/users">Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/shop">Shop</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            {
                                props.isLoggedin ?
                                (
                                    <>
                                        <li className="nav-item">
                                            <button style={{ border:"none", backgroundColor:"#fff" }} className="nav-link" onClick={handleLogout}>Logout</button>
                                        </li>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register">Register</Link>
                                        </li>
                                    </>
                                )
                            }
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">Cart ({props.cartItems.length})</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;
