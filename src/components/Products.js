import React, { useState } from 'react';
import OrderBy from './OrderBy';
import Product from './Product';
import Pagination from './Pagination';


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
                    {
                        props.successMessage !== "" && 
                        <div className="col-md-12">
                            <div className="alert alert-success" role="alert">
                                {props.successMessage}
                            </div>
                        </div>
                    }
                    <div className="col-md-6">
                        {products.length} product{products.length > 1 ? "s" : ""} found.
                    </div>
                    <div className="col-md-5">
                        <OrderBy 
                            selectedOrder={selectedOrder} 
                            handleOrderBy={handleOrderBy} 
                        />
                    </div>
                </div>
                {
                    products.map((product) => (
                        <Product 
                            key={product.id} 
                            product={product} 
                            handleAddToCart={props.handleAddToCart} 
                        />
                    ))
                }
            </div>
            <Pagination
                productsPerPage={props.productsPerPage}
                totalProducts={props.totalProducts}
                paginate={props.paginate}
                goToNextPage={props.goToNextPage}
                goToPreviousPage={props.goToPreviousPage}
                currentPage={props.currentPage}
            />
        </>
    )
}

export default Products;
