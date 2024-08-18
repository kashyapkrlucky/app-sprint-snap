// components/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [...Array(totalPages).keys()].map((num) => num + 1);

    return (
        <nav className="flex justify-center space-x-1">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded-md focus:outline-none ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    {page}
                </button>
            ))}
        </nav>
    );
};

export default Pagination;
