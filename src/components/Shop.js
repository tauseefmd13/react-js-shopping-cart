import React from 'react';
import Main from './Main';
import Sidebar from './Sidebar';

const Shop = (props) => {
    
    return (
        <>
            <div className={`${props.products.length > 0 ? "wrap" : ""}`}>
              <Sidebar 
                products={props.products} 
                selectedSizes={props.selectedSizes} 
                handleClick={props.handleClick} 
              />
              <Main 
                products={props.currentProducts} 
                selectedSizes={props.selectedSizes} 
                handleAddToCart={props.handleAddToCart} 
                productsPerPage={props.productsPerPage}
                totalProducts={props.products.length}
                paginate={props.paginate}
                goToNextPage={props.goToNextPage}
                goToPreviousPage={props.goToPreviousPage}
                currentPage={props.currentPage}
                successMessage={props.successMessage}
              />
            </div>
        </>
    )
}

export default Shop;
