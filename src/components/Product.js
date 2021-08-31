import React from 'react';

const Product = (props) => {

    let product = props.product;
    
    return (
        <>
            <div data-price="290" className="item">
                <img src={`images/${product.sku}_1.jpg`} alt={product.title} className="img-item" />
                <div className="info">
                    <h3>{product.title}</h3>
                    <p className="descroption">{product.description}</p>
                    <h5>{product.currencyFormat + product.price}</h5>
                </div>
                <div className="btn-center">
                    <button onClick={() => props.handleAddToCart(product)} className="btn btn-primary">Add to cart</button>
                </div>
            </div>
        </>
    )
}

export default Product;
