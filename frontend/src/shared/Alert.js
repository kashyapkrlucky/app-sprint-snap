// components/Alert.js
import React from 'react';

const Alert = ({ type = 'info', message }) => {
    const baseStyle = 'flex items-center p-4 rounded-md shadow-md';

    const typeStyles = {
        info: 'bg-blue-50 text-blue-700',
        success: 'bg-green-50 text-green-700',
        warning: 'bg-yellow-50 text-yellow-700',
        danger: 'bg-red-50 text-red-700',
    };

    return (
        <div className={`${baseStyle} ${typeStyles[type]}`}>
            <span>{message}</span>
        </div>
    );
};

export default Alert;
