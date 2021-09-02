import React from 'react';
import Products from './Products';

const Main = (props) => {
    return (
        <>
            {
                props.products.length > 0 ? (
                    <>
                        <div className="items">
                            <Products 
                                data={props.products} 
                                selectedSizes={props.selectedSizes} 
                                handleAddToCart={props.handleAddToCart} 
                                productsPerPage={props.productsPerPage}
                                totalProducts={props.totalProducts}
                                paginate={props.paginate}
                                goToNextPage={props.goToNextPage}
                                goToPreviousPage={props.goToPreviousPage}
                                currentPage={props.currentPage}
                                successMessage={props.successMessage}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="container my-4 bg-white">
                            <div className="row">
                                <div className="col-12 my-4 text-center">
                                    <h2 className="mb-4">Products not found.</h2>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            
        </>
    )
}

export default Main;
