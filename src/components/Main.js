import React from 'react';
import Products from './Products';

const Main = (props) => {
    return (
        <>
            <div className="items">
                <Products data={props.products} selectedSizes={props.selectedSizes} handleAddToCart={props.handleAddToCart} />
            </div>
        </>
    )
}

export default Main;
