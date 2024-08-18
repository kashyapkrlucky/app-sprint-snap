// components/Card.js
import React from 'react';

const Card = ({ children, title, footer }) => {
    return (
        <div className="bg-white shadow-sm border rounded-lg overflow-hidden">
            {title && (
                <div className="p-4 bg-gray-100 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">{title}</h3>
                </div>
            )}
            <div className="p-4">
                {children}
            </div>
            {footer && (
                <div className="p-4 bg-gray-100 border-t border-gray-200 text-right">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
