import React from 'react';

const OrderBy = (props) => {
    return (
        <>
            <div className="row">
                <label htmlFor="sort" className="col-sm-4 col-form-label">Sort by:</label>
                <div className="col-sm-8">
                    <select value={props.selectedOrder} onChange={props.handleOrderBy} className="form-control">
                        <option value="">Select</option>
                        <option value="lowest">Lowest to highest</option>
                        <option value="highest">Highest to lowest</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default OrderBy;
