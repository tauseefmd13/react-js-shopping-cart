import React, { useState } from 'react';
import OrderBy from './OrderBy';
import Product from './Product';

const Products = (props) => {

    const [state, setState] = useState({
        selectedOrder: "",
    });

    const handleOrderBy = (event) => {
        setState({ selectedOrder: event.target.value });
    }

    const handleOrderProducts = (order, sizes, products) => {
        let sortedProducts = [...products];
        
        if(sizes.length > 0) {
            sortedProducts = sortedProducts.filter((p) => {
                for (const size of sizes) {
                    if (p.availableSizes.includes(size)) {
                        return true;
                    }
                }

                return false;
            });
        }

        if(order === "lowest") {
            sortedProducts = sortedProducts.sort((a,b) => a.price - b.price);
        }

        if(order === "highest") {
            sortedProducts = sortedProducts.sort((a,b) => b.price - a.price);
        }

        return sortedProducts;
    }

    let selectedOrder = state.selectedOrder;
    let products = handleOrderProducts(selectedOrder, props.selectedSizes, props.data);

    return (
        <>
            <div className="items">
                <div className="row mb-3">
                    <div className="col-md-6">
                        {products.length} product{products.length > 1 ? "s" : ""} found.
                    </div>
                    <div className="col-md-5">
                        <OrderBy selectedOrder={selectedOrder} handleOrderBy={handleOrderBy} />
                    </div>
                </div>
                {
                    products.map((product) => (
                        <Product key={product.id} product={product} handleAddToCart={props.handleAddToCart} />
                    ))
                }
            </div>
            {/* <button className="loadmore">Load More</button> */}
        </>
    )
}

export default Products;
