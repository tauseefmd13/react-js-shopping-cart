import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {

    let subTotalAmount = props.cartItems.reduce((acc,cv) => {
        acc = acc + (cv.price * cv.quantity);
        return acc;
    }, 0);

    let totalShippingAmount = 0;
    let totalAmount = subTotalAmount + totalShippingAmount;
    
    return (
        <>
            <div className="container my-4 bg-white">
                <div className="row">
                    {
                        props.cartItems.length === 0 ? 
                        (
                            <>
                                <div className="col-12 my-4 text-center">
                                    <h2>Cart</h2>
                                    <p>Your cart is empty.</p>
                                    <Link to="/" className="btn btn-block btn-dark">Back to home</Link>
                                </div>
                            </>
                        )
                        :
                        (
                            <>
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col"> </th>
                                                    <th scope="col">Product</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Price</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    props.cartItems.map(item => (
                                                        <tr key={item.id}>
                                                            <td><img src={`images/${item.sku}_1.jpg`} alt={item.title} /></td>
                                                            <td>
                                                                {item.title}
                                                                <br />
                                                                {item.description}
                                                            </td>
                                                            <td><button onClick={() => props.handleDecrementQuantity(item.id)}>-</button> <span>{item.quantity}</span> <button onClick={() => props.handleIncrementQuantity(item.id)}>+</button></td>
                                                            <td>{item.currencyFormat + item.price}</td>
                                                            <td><button onClick={() => props.handleRemoveCartItem(item.id)} className="btn btn-sm btn-danger">X</button></td>
                                                        </tr>
                                                    ))
                                                }
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Sub Total</td>
                                                    <td className="text-right">${subTotalAmount.toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Shipping</td>
                                                    <td className="text-right">${totalShippingAmount.toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td><strong>Total</strong></td>
                                                    <td className="text-right"><strong>${totalAmount.toFixed(2)}</strong></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col mb-2">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <Link to="/" className="btn btn-block btn-dark">Continue Shopping</Link>
                                        </div>
                                        <div className="col-sm-12 col-md-6">
                                            <button onClick={() => alert(`Total amount is : $${totalAmount.toFixed(2)}`) } className="btn btn-block btn-primary" style={{ float:"right" }}>Checkout</button>

                                            <button onClick={props.handleClearCart} className="btn btn-block btn-danger" style={{ float:"right", marginRight:"5px" }}>Clear Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )    
                    }
                </div>
            </div>
        </>
    )
}

export default Cart;
