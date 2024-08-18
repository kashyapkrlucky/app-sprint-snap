// components/Badge.js
import React from 'react';

const Badge = ({ children, variant = 'info' }) => {
    const baseStyle = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium';

    const variantStyles = {
        info: 'bg-blue-100 text-blue-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
    };

    return <span className={`${baseStyle} ${variantStyles[variant]}`}>{children}</span>;
};

export default Badge;
