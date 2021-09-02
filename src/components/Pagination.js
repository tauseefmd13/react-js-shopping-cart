import React from 'react';

const Pagination = ({ productsPerPage, totalProducts, paginate, goToNextPage, goToPreviousPage, currentPage }) => {
    
    const pages = Math.round(totalProducts / productsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <nav className="my-3">
                <ul className="pagination" style={{ justifyContent:"center" }}>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button onClick={goToPreviousPage} className="page-link">Previous</button>
                    </li>

                    {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                    ))}

                    <li className={`page-item ${currentPage === pages ? 'disabled' : ''}`}>
                        <button onClick={goToNextPage} className="page-link">Next</button>
                    </li>
                </ul>
            </nav>
            {/* <button className="loadmore">Load More</button> */}
        </>
    )
}

export default Pagination;
