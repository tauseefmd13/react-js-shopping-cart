import React from 'react';

const Sidebar = (props) => {

    let sizes = props.products.reduce((acc,cv) => {
        acc = acc.concat(cv.availableSizes);
        return acc;
    },[]);

    let uniqueSizes = [...new Set(sizes)];

    return (
        <>
            <div className="menu">
                <div className="menu-size menu-item">
                    <div className="header-item">Size</div>
                    <ul className="color-row1">
                        {
                            uniqueSizes.map((size) => (
                                <li key={size} className={`color-circle size-circle ${props.selectedSizes.includes(size) ? "size-active" : ""}`}>
                                    <p onClick={() => props.handleClick(size)} className={size.length > 1 ? "sizedouble" : "size"}>{size}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
