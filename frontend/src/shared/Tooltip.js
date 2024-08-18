// components/Tooltip.js
import React from 'react';

const Tooltip = ({ children, message }) => {
    return (
        <div className="relative group">
            {children}
            <div className="absolute bottom-full left-10 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs p-2 rounded-md shadow-md">
                {message}
            </div>
        </div>
    );
};

export default Tooltip;
